import type { SVGProps } from 'react';

type SymbolProps = SVGProps<SVGSVGElement>;

const base: SVGProps<SVGSVGElement> = {
  viewBox: '0 0 48 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

/** Resistor — IEC zig-zag box */
export const Resistor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h8l3-6 4 12 4-12 4 12 4-12 3 6h8" />
  </svg>
);

/** Capacitor — two parallel plates */
export const Capacitor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h18M28 12h18M20 3v18M28 3v18" />
  </svg>
);

/** Variable resistor — resistor box with diagonal arrow */
export const VariableResistor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h6M40 12h6M8 12h32v0" />
    <rect x="8" y="8" width="32" height="8" />
    <path d="M6 22 42 2" />
  </svg>
);

/** LDR — variable resistor with light arrows */
export const LDR = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <rect x="8" y="9" width="32" height="7" />
    <path d="M2 12.5h6M40 12.5h6" />
    <path d="M18 5 12 1M22 6 17 1" />
  </svg>
);

/** Diode — triangle + bar */
export const Diode = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h14M32 12h14" />
    <path d="M16 4v16l16-8z" />
    <path d="M32 4v16" />
  </svg>
);

/** LED — diode with light-emitting arrows */
export const LED = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h12M32 12h14" />
    <path d="M14 4v16l16-8z" />
    <path d="M30 4v16" />
    <path d="M28 2 34 -3M33 4 39 -1" transform="translate(0,5)" />
  </svg>
);

/** Zener diode — diode with bent bar */
export const ZenerDiode = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h14M32 12h14" />
    <path d="M16 4v16l16-8z" />
    <path d="M28 4h4v6M36 14v6h4" />
  </svg>
);

/** Inductor — coil loops */
export const Inductor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h6" />
    <path d="M8 12a4 6 0 0 1 8 0 4 6 0 0 1 8 0 4 6 0 0 1 8 0 4 6 0 0 1 8 0" />
    <path d="M40 12h6" />
  </svg>
);

/** Transformer — two coils with core lines */
export const Transformer = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h6" />
    <path d="M8 6a3 3 0 0 1 6 0v12a3 3 0 0 1-6 0" />
    <path d="M22 2v20M26 2v20" />
    <path d="M34 6a3 3 0 0 0-6 0v12a3 3 0 0 0 6 0" />
    <path d="M40 12h6" />
  </svg>
);

/** NPN Transistor */
export const NPNTransistor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <circle cx="22" cy="12" r="10" />
    <path d="M16 6v12" />
    <path d="M16 9 26 4M16 15 26 20" />
    <path d="M26 4 24 8M24 8 28 8" />
    <path d="M26 20v3M40 4h-4M40 20h-4" />
  </svg>
);

/** PNP Transistor */
export const PNPTransistor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <circle cx="22" cy="12" r="10" />
    <path d="M16 6v12" />
    <path d="M16 9 26 4M16 15 26 20" />
    <path d="M16 9 18 6M18 6 15 5" />
    <path d="M26 4v3M40 4h-4M40 20h-4" />
  </svg>
);

/** MOSFET */
export const MOSFET = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M14 4v6M14 14v6M14 8h2M14 12h2M14 16h2" />
    <path d="M18 2v20" />
    <path d="M18 6h10v0M28 6v-4M18 12h14M18 18h10v4" />
    <path d="M28 2v8M42 6h-6M42 20h-14v-8" />
  </svg>
);

/** Op-amp — triangle */
export const OpAmp = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M10 3v18l26-9z" />
    <path d="M2 7h8M2 17h8M36 12h10" />
    <path d="M13 7h3M13 17h3M14.5 15.5v3" />
  </svg>
);

/** Battery — long/short parallel lines */
export const Battery = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h12M34 12h12" />
    <path d="M14 4v16M20 8v8M26 4v16M32 8v8" />
  </svg>
);

/** Switch — open contact */
export const Switch = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h10M34 12h12" />
    <circle cx="13" cy="12" r="1.6" fill="currentColor" />
    <circle cx="35" cy="12" r="1.6" fill="currentColor" />
    <path d="M13 12 32 5" />
  </svg>
);

/** Relay — coil + switch */
export const Relay = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <rect x="4" y="6" width="14" height="12" />
    <path d="M18 8 24 12M18 16 24 12" />
    <path d="M28 12h6M34 5v14" strokeDasharray="2 2" />
    <path d="M38 6h8M38 18h6" />
    <circle cx="38" cy="6" r="1.4" fill="currentColor" />
  </svg>
);

/** Fuse — resistor bar inside oval */
export const Fuse = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h10M36 12h10" />
    <rect x="12" y="6" width="24" height="12" rx="6" />
    <path d="M12 12h24" />
  </svg>
);

/** Crystal — quartz oscillator */
export const Crystal = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h14M32 12h14" />
    <path d="M16 4v16M32 4v16" />
    <rect x="20" y="6" width="8" height="12" />
  </svg>
);

/** Antenna */
export const Antenna = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M24 22V10" />
    <path d="M24 10 14 2M24 10 34 2" />
    <path d="M18 6 24 10 30 6" />
  </svg>
);

/** Ground */
export const Ground = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M24 2v10" />
    <path d="M14 12h20M17 16h14M20 20h8" />
  </svg>
);

/** Speaker */
export const Speaker = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M4 9h6l9-6v18l-9-6H4z" />
    <path d="M24 8a6 6 0 0 1 0 8M29 4a12 12 0 0 1 0 16" />
  </svg>
);

/** Motor */
export const Motor = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M2 12h6M40 12h6" />
    <circle cx="24" cy="12" r="10" />
    <path d="M19 8h5v8h-5" strokeLinejoin="round" />
    <path d="M24 12h5" />
  </svg>
);

/** AND gate */
export const AndGate = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M12 3h8a9 9 0 0 1 0 18h-8z" />
    <path d="M2 8h10M2 16h10M29 12h8" />
  </svg>
);

/** OR gate */
export const OrGate = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M12 3q10 0 17 9-7 9-17 9q4-9 0-18z" />
    <path d="M4 8h7M4 16h7M29 12h8" />
  </svg>
);

/** NOT gate (inverter) */
export const NotGate = (p: SymbolProps) => (
  <svg {...base} {...p}>
    <path d="M10 3v18l20-9z" />
    <circle cx="32.5" cy="12" r="2.2" />
    <path d="M2 12h8M35 12h9" />
  </svg>
);

export const SYMBOL_LIST = [
  Resistor,
  Capacitor,
  VariableResistor,
  LDR,
  Diode,
  LED,
  ZenerDiode,
  Inductor,
  Transformer,
  NPNTransistor,
  PNPTransistor,
  MOSFET,
  OpAmp,
  Battery,
  Switch,
  Relay,
  Fuse,
  Crystal,
  Antenna,
  Ground,
  Speaker,
  Motor,
  AndGate,
  OrGate,
  NotGate,
] as const;

export type SymbolComponent = (typeof SYMBOL_LIST)[number];
