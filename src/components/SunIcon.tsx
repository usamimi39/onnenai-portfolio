// Figma の icon/sun（20px）と同じ形。線色を currentColor にして、テーマの文字色に従わせる（<img> では色を継承できないため）
export function SunIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth={1.42857}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5714 10C13.5714 11.9724 11.9724 13.5714 10 13.5714C8.02756 13.5714 6.42857 11.9724 6.42857 10C6.42857 8.02756 8.02756 6.42857 10 6.42857C11.9724 6.42857 13.5714 8.02756 13.5714 10Z" />
        <path d="M10 0.714286V3.57143" />
        <path d="M3.42856 3.42843L5.45713 5.457" />
        <path d="M0.714286 10H3.57143" />
        <path d="M3.42856 16.5713L5.45713 14.5428" />
        <path d="M10 19.2857V16.4286" />
        <path d="M16.5714 16.5713L14.5428 14.5428" />
        <path d="M19.2857 10H16.4286" />
        <path d="M16.5714 3.42843L14.5428 5.457" />
      </g>
    </svg>
  )
}
