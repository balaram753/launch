import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { SYMBOL_LIST } from '../assets/symbols';
import { useReducedMotion } from '../utils/useReducedMotion';
import './Decryption.css';

const WORD = ['P', 'U', 'L', 'S', 'E'];
const LOCK_TIMES = [0.35, 0.68, 1.0, 1.32, 1.64];
const SCRAMBLE_INTERVAL_MS = 75;

interface DecryptionProps {
  onComplete: () => void;
}

export function Decryption({ onComplete }: DecryptionProps) {
  const reducedMotion = useReducedMotion();
  const [lockedCount, setLockedCount] = useState(reducedMotion ? WORD.length : 0);
  const [tick, setTick] = useState(0);
  const [showSignal, setShowSignal] = useState(!reducedMotion);
  const completedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) {
      const t = setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete();
        }
      }, 500);
      return () => clearTimeout(t);
    }

    const tl = gsap.timeline();
    LOCK_TIMES.forEach((time, i) => {
      tl.call(
        () => {
          setLockedCount(i + 1);
          if (i === WORD.length - 1) {
            setTimeout(() => {
              if (!completedRef.current) {
                completedRef.current = true;
                onComplete();
              }
            }, 480);
          }
        },
        undefined,
        time,
      );
    });
    tl.call(() => setShowSignal(false), undefined, 0.75);

    return () => {
      tl.kill();
    };
  }, [onComplete, reducedMotion]);

  useEffect(() => {
    if (reducedMotion || lockedCount >= WORD.length) return;
    const id = setInterval(() => setTick((t) => t + 1), SCRAMBLE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [reducedMotion, lockedCount]);

  return (
    <div className="decrypt">
      {showSignal && <div className="decrypt__signal" aria-hidden="true" />}
      <div className="decrypt__row" role="img" aria-label="PULSE">
        {WORD.map((letter, i) => {
          const locked = i < lockedCount;
          if (locked) {
            return (
              <span className="decrypt__slot" key={i}>
                <span className="decrypt__letter">{letter}</span>
              </span>
            );
          }
          const Symbol = SYMBOL_LIST[(tick + i * 7) % SYMBOL_LIST.length];
          return (
            <span className="decrypt__slot" key={i}>
              <Symbol className="decrypt__symbol" />
            </span>
          );
        })}
      </div>
      <div className="decrypt__status">Decrypting Signal</div>
    </div>
  );
}
