const s = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }

export function IconPencil({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
      <path d="m15 5 4 4" />
    </svg>
  )
}

export function IconHandshake({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M11 17a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1" />
      <path d="M13 17a4 4 0 0 0 4-4V5a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v1" />
      <path d="M3 17h4V9H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2Z" />
      <path d="M21 17h-4V9h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2Z" />
    </svg>
  )
}

export function IconCheckCircle({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconGift({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
      <path d="M4 7h16v5H4Z" />
      <path d="M12 7V3" />
      <path d="M8 7a3 3 0 0 1 0-6 4 4 0 0 1 4 4" />
      <path d="M16 7a3 3 0 0 0 0-6 4 4 0 0 0-4 4" />
    </svg>
  )
}

export function IconShield({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

export function IconEyeOff({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <path d="m1 1 22 22" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    </svg>
  )
}

export function IconMapPin({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

export function IconHeart({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

export function IconBan({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="10" />
      <path d="m4.93 4.93 14.14 14.14" />
    </svg>
  )
}

export function IconUsers({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

export function IconBuilding({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M3 21h18" />
      <path d="M6 21V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v14" />
      <path d="M10 3v2" />
      <path d="M14 3v2" />
      <path d="M8 11h2" />
      <path d="M8 15h2" />
      <path d="M8 7h2" />
      <path d="M14 11h2" />
      <path d="M14 15h2" />
      <path d="M14 7h2" />
    </svg>
  )
}

export function IconFileText({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5Z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  )
}

export function IconMenu({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  )
}

export function IconQuote({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2H4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2 0 0 1 0 1 .5s.5 1 .5 2.5-.5 2.5-2.5 4.5ZM13 21c3 0 7-1 7-8V5c0-1.25-.756-2-2-2h-4c-1.25 0-2 .75-2 2v7c0 1.25.75 2 2 2 0 0 1 0 1 .5s.5 1 .5 2.5-.5 2.5-2.5 4.5Z" />
    </svg>
  )
}

export function IconArrowLeft({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}

export function IconArrowUpRight({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="M7 7h10v10" />
      <path d="M7 17 17 7" />
    </svg>
  )
}

export function IconSparkles({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <path d="m12 3-1.5 5.5L5 10l5.5 1.5L12 17l1.5-5.5L19 10l-5.5-1.5Z" />
      <path d="M18 21a8 8 0 0 0-8-8" />
      <path d="M18 21a8 8 0 0 1-8-8" />
    </svg>
  )
}

export function IconSun({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}

export function IconTarget({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}
