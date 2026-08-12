import { useEffect } from 'react';
import { useReducedMotion } from '../utils/useReducedMotion';
import './ECGPulse.css';

interface ECGPulseProps {
  onComplete: () => void;
}

export function ECGPulse({ onComplete }: ECGPulseProps) {
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(onComplete, reducedMotion ? 1100 : 2200);
    return () => clearTimeout(t);
  }, [onComplete, reducedMotion]);

  return (
    <div className="ecg">
      <div className="ecg__wordmark">
        <h1 className={`ecg__logo ${reducedMotion ? '' : 'ecg__logo--glow'}`}>PULSE</h1>
        <svg className="ecg__trace" viewBox="0 0 400 60" fill="none" preserveAspectRatio="none" aria-hidden="true">
          <path
            className="ecg__trace-path"
            d="M0 30 H150 L160 30 L172 6 L186 54 L198 30 L214 30 L224 16 L232 30 H400"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="ecg__status">System Initialized</div>
    </div>
  );
}
