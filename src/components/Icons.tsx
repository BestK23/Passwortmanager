import type { SVGProps } from 'react';

const base: SVGProps<SVGSVGElement> = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

export function LockIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="10.5" width="16" height="10" rx="2.5" />
      <path d="M7.5 10.5V7a4.5 4.5 0 0 1 9 0v3.5" />
      <circle cx="12" cy="15" r="1.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FaceIdIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 8V6a2 2 0 0 1 2-2h2" />
      <path d="M20 8V6a2 2 0 0 0-2-2h-2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <path d="M20 16v2a2 2 0 0 1-2 2h-2" />
      <path d="M9 10v1.5" />
      <path d="M15 10v1.5" />
      <path d="M9 15.2c.8.7 1.8 1 3 1s2.2-.3 3-1" />
      <path d="M12 10.5v3h-1" />
    </svg>
  );
}

export function EyeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="2.8" />
    </svg>
  );
}

export function EyeOffIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M3 3l18 18" />
      <path d="M10.6 5.6C11.05 5.53 11.52 5.5 12 5.5c6 0 9.5 6.5 9.5 6.5a17.6 17.6 0 0 1-3.2 4.1M7.4 7.3C4.9 8.9 2.5 12 2.5 12S6 18.5 12 18.5c1.2 0 2.3-.2 3.3-.6" />
      <path d="M9.5 10.5a2.8 2.8 0 0 0 4 4" />
    </svg>
  );
}

export function CopyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <rect x="9" y="9" width="11" height="11" rx="2.2" />
      <path d="M6 15H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function TrashIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 7h16" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12.5l4.5 4.5L19 7" />
    </svg>
  );
}

export function RefreshIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12a8 8 0 0 1 13.7-5.7L20 8" />
      <path d="M20 4v4h-4" />
      <path d="M20 12a8 8 0 0 1-13.7 5.7L4 16" />
      <path d="M4 20v-4h4" />
    </svg>
  );
}
