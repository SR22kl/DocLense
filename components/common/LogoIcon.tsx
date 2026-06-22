// components/logo-icon.tsx

interface LogoIconProps {
  className?: string;
}

export function LogoIcon({ className }: LogoIconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      className={className}
    >
      <defs>
        <linearGradient
          id="logoGradient"
          x1="0"
          y1="0"
          x2="256"
          y2="256"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="45%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>

      {/* Outer Circle */}
      <circle cx="128" cy="128" r="118" fill="url(#logoGradient)" />

      {/* Chip Body */}
      <rect
        x="82"
        y="82"
        width="92"
        height="92"
        rx="16"
        stroke="white"
        strokeWidth="6"
      />

      {/* Inner Core */}
      <rect
        x="112"
        y="112"
        width="32"
        height="32"
        rx="2"
        stroke="white"
        strokeWidth="5"
      />

      {/* Dots */}
      {[
        [110, 98],
        [128, 98],
        [146, 98],
        [98, 110],
        [98, 128],
        [98, 146],
        [158, 110],
        [158, 128],
        [158, 146],
        [110, 158],
        [128, 158],
        [146, 158],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="3.5" fill="white" />
      ))}

      {/* Top */}
      <line
        x1="128"
        y1="82"
        x2="128"
        y2="42"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="128" cy="34" r="8" stroke="white" strokeWidth="5" />

      <path
        d="M102 82V68L88 54H64"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="54" r="8" stroke="white" strokeWidth="5" />

      <path
        d="M154 82V68L168 54H192"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="54" r="8" stroke="white" strokeWidth="5" />

      {/* Left */}
      <line
        x1="82"
        y1="110"
        x2="42"
        y2="110"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="34" cy="110" r="8" stroke="white" strokeWidth="5" />

      <line
        x1="82"
        y1="146"
        x2="42"
        y2="146"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="34" cy="146" r="8" stroke="white" strokeWidth="5" />

      {/* Right */}
      <line
        x1="174"
        y1="110"
        x2="214"
        y2="110"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="222" cy="110" r="8" stroke="white" strokeWidth="5" />

      <line
        x1="174"
        y1="146"
        x2="214"
        y2="146"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="222" cy="146" r="8" stroke="white" strokeWidth="5" />

      {/* Bottom */}
      <line
        x1="128"
        y1="174"
        x2="128"
        y2="214"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <circle cx="128" cy="222" r="8" stroke="white" strokeWidth="5" />

      <path
        d="M102 174V188L88 202H64"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="56" cy="202" r="8" stroke="white" strokeWidth="5" />

      <path
        d="M154 174V188L168 202H192"
        stroke="white"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="200" cy="202" r="8" stroke="white" strokeWidth="5" />
    </svg>
  );
}
