import { Fragment, useCallback, useRef, useState } from 'react';
import { Battery, Ground, LED, Resistor } from '../assets/symbols';
import { useReducedMotion } from '../utils/useReducedMotion';
import './CircuitGame.css';

const NODES = [
  { Icon: Battery, label: 'Power' },
  { Icon: Resistor, label: 'Component' },
  { Icon: LED, label: 'Pulse' },
  { Icon: Ground, label: 'Ground' },
];

const GAP_COUNT = NODES.length - 1;
const CONNECT_THRESHOLD = 0.65;

interface GapProps {
  index: number;
  connected: boolean;
  onConnect: (index: number) => void;
}

function Gap({ index, connected, onConnect }: GapProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(connected ? 1 : 0);
  const [dragging, setDragging] = useState(false);
  const startXRef = useRef(0);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (connected) return;
      (e.target as Element).setPointerCapture(e.pointerId);
      startXRef.current = e.clientX;
      setDragging(true);
    },
    [connected],
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging || connected || !trackRef.current) return;
      const width = trackRef.current.getBoundingClientRect().width;
      const dx = e.clientX - startXRef.current;
      const p = Math.min(Math.max(dx / width, 0), 1);
      setProgress(p);
      if (p >= CONNECT_THRESHOLD) {
        setDragging(false);
        setProgress(1);
        onConnect(index);
      }
    },
    [dragging, connected, index, onConnect],
  );

  const handlePointerUp = useCallback(() => {
    if (!connected) {
      setDragging(false);
      setProgress(0);
    }
  }, [connected]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !connected) {
        e.preventDefault();
        setProgress(1);
        onConnect(index);
      }
    },
    [connected, index, onConnect],
  );

  return (
    <div
      ref={trackRef}
      className={`circuit__gap ${connected ? 'circuit__gap--connected' : ''} ${dragging ? 'circuit__gap--dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="circuit__gap-track" />
      <div className="circuit__gap-fill" style={{ width: `${progress * 100}%` }} />
      <div
        className="circuit__plug"
        style={{ left: `${progress * 100}%` }}
        role="button"
        tabIndex={connected ? -1 : 0}
        aria-label={`Connect wire segment ${index + 1} of ${GAP_COUNT}`}
        aria-pressed={connected}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}

interface CircuitGameProps {
  onComplete: () => void;
  onSkip: () => void;
}

export function CircuitGame({ onComplete, onSkip }: CircuitGameProps) {
  const reducedMotion = useReducedMotion();
  const [connected, setConnected] = useState<boolean[]>(Array(GAP_COUNT).fill(false));
  const [done, setDone] = useState(false);

  const handleConnect = useCallback(
    (index: number) => {
      setConnected((prev) => {
        const next = [...prev];
        next[index] = true;
        const allConnected = next.every(Boolean);
        if (allConnected && !done) {
          setDone(true);
          setTimeout(onComplete, reducedMotion ? 500 : 1100);
        }
        return next;
      });
    },
    [done, onComplete, reducedMotion],
  );

  return (
    <div className="circuit">
      <div className="circuit__header">
        <h2 className="circuit__title">Route the Signal</h2>
        <div className="circuit__subtitle">Drag to connect · Power → Components → Pulse → Ground</div>
      </div>

      <div className="circuit__track">
        {NODES.map((node, i) => (
          <Fragment key={i}>
            <div className={`circuit__node ${done ? 'circuit__node--lit' : ''}`}>
              <node.Icon className="circuit__node-icon" />
              <span className="circuit__node-label">{node.label}</span>
            </div>
            {i < GAP_COUNT && <Gap index={i} connected={connected[i]} onConnect={handleConnect} />}
          </Fragment>
        ))}
      </div>

      <div className="circuit__footer">
        {done ? <div className="circuit__status">System Online</div> : <button className="circuit__skip" onClick={onSkip}>Skip →</button>}
      </div>
    </div>
  );
}
