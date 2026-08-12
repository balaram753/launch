import './SystemOnline.css';

const MAIN_SITE_URL = import.meta.env.VITE_MAIN_SITE_URL || '/';

interface SystemOnlineProps {
  onReplay: () => void;
}

export function SystemOnline({ onReplay }: SystemOnlineProps) {
  return (
    <div className="online">
      <div className="online__status">System Online</div>
      <h1 className="online__title">PULSE ECE</h1>
      <div className="online__tagline">Engineering the Future</div>
      <div className="online__actions">
        <a className="online__enter" href={MAIN_SITE_URL}>
          Enter Pulse
        </a>
        <button type="button" className="online__replay" onClick={onReplay}>
          Replay Experience
        </button>
      </div>
    </div>
  );
}
