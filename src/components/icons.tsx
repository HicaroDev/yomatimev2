// Ícones em SVG (traço 1.5) — sem emoji, sem biblioteca externa.
type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export function ArrowRight({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function WhatsApp({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M3.5 20.5 5 16.3A8.5 8.5 0 1 1 8 19.2Z" />
      <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l1-1.6-2-1-1 .8a4.5 4.5 0 0 1-2.2-2.2l.8-1-1-2Z" />
    </svg>
  );
}

export function Instagram({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r=".6" fill="currentColor" />
    </svg>
  );
}

export function Facebook({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M14 21v-7.5h2.6l.4-3H14V8.7c0-.9.3-1.5 1.6-1.5H17V4.5a19 19 0 0 0-2.3-.1C12.4 4.4 11 5.8 11 8.3v2.2H8.5v3H11V21" />
    </svg>
  );
}

export function Pin({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function Mail({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

export function Phone({ className = "size-5" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M5 4h3.5l1.5 4-2 1.3a10 10 0 0 0 6.7 6.7L16 14l4 1.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
    </svg>
  );
}

export function Menu({ className = "size-6" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base}>
      <path d="M4 8h16M4 16h16" />
    </svg>
  );
}
