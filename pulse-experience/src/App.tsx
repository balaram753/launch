import { useCallback, useState } from 'react';
import { BootScreen } from './components/BootScreen';
import { Decryption } from './components/Decryption';
import { ECGPulse } from './components/ECGPulse';
import { CircuitGame } from './components/CircuitGame';
import { SystemOnline } from './components/SystemOnline';
import { useReducedMotion } from './utils/useReducedMotion';
import './components/SkipLink.css';

type Phase = 'offline' | 'decrypt' | 'ecg' | 'game' | 'online';

function App() {
  const [phase, setPhase] = useState<Phase>('offline');
  const reducedMotion = useReducedMotion();

  const goOffline = useCallback(() => setPhase('offline'), []);
  const goDecrypt = useCallback(() => setPhase('decrypt'), []);
  const goEcg = useCallback(() => setPhase('ecg'), []);
  const goGame = useCallback(() => setPhase('game'), []);
  const goOnline = useCallback(() => setPhase('online'), []);

  const showSkip = phase === 'decrypt' || phase === 'ecg';

  return (
    <>
      {phase === 'offline' && <BootScreen onInitialize={goDecrypt} />}
      {phase === 'decrypt' && <Decryption onComplete={goEcg} />}
      {phase === 'ecg' && <ECGPulse onComplete={goGame} />}
      {phase === 'game' && <CircuitGame onComplete={goOnline} onSkip={goOnline} />}
      {phase === 'online' && <SystemOnline onReplay={goOffline} />}

      {showSkip && (
        <button type="button" className="skip-link" onClick={goOnline} aria-label="Skip experience">
          Skip Experience →
        </button>
      )}

      {reducedMotion && phase === 'offline' && <span className="visually-hidden">Reduced motion mode active.</span>}
    </>
  );
}

export default App;
