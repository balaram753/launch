import { useCallback, useEffect, useRef } from 'react';
import { useMotionInit } from '../utils/useMotionInit';
import './BootScreen.css';

interface BootScreenProps {
  onInitialize: () => void;
}

export function BootScreen({ onInitialize }: BootScreenProps) {
  const { mode, requestMotionPermission, triggerManually } = useMotionInit(onInitialize);
  const fieldRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    if (event.pointerType !== 'mouse' || !fieldRef.current) return;
    const { clientX, clientY } = event;
    fieldRef.current.style.setProperty('--px', `${clientX}px`);
    fieldRef.current.style.setProperty('--py', `${clientY}px`);
    fieldRef.current.style.setProperty('--field-opacity', '1');
  }, []);

  const handlePointerLeave = useCallback(() => {
    fieldRef.current?.style.setProperty('--field-opacity', '0');
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        triggerManually();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [triggerManually]);

  const label = mode === 'shake' ? 'Shake to Initialize' : mode === 'permission' ? 'Enable Motion' : 'Click to Initialize';

  return (
    <div
      className="boot"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={mode === 'permission' ? undefined : triggerManually}
      role="button"
      tabIndex={0}
      aria-label="Initialize PULSE experience"
    >
      <div className="boot__grid" />
      <div className="boot__field" ref={fieldRef} />
      <div className="boot__content">
        <h1 className="boot__logo">PULSE</h1>
        <div className="boot__status">System Offline</div>
        <svg className="boot__ecg" viewBox="0 0 260 48" fill="none" aria-hidden="true">
          <path
            className="boot__ecg-path"
            d="M0 24 H90 L100 24 L108 6 L118 42 L126 24 L138 24 L146 14 L152 24 H260"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="boot__cta">
          {mode === 'permission' ? (
            <>
              <button type="button" className="boot__enable-btn" onClick={requestMotionPermission}>
                Enable Motion
              </button>
              <button type="button" className="boot__fallback" onClick={triggerManually}>
                Tap to Initialize
              </button>
            </>
          ) : (
            <div className="boot__cta-label">{label}</div>
          )}
        </div>
      </div>
    </div>
  );
}
