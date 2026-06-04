function SectionTitle({
  title,
  subtitle,
  align = "center",
  light = false,
  className = "",
}) {
  const alignments = { center: "text-center", right: "text-right", left: "text-left" }
  const lineMargin = { center: "mx-auto", right: "mr-auto ml-0", left: "ml-auto mr-0" }

  return (
    <div className={`mb-14 ${alignments[align] || alignments.center} ${className}`}>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 ${
          light ? "text-white" : "text-primary"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-base md:text-lg leading-relaxed max-w-2xl ${
            light ? "text-white/70" : "text-text-muted"
          } ${align === "center" ? "mx-auto" : ""}`}
        >
          {subtitle}
        </p>
      )}
      <div
        className={`w-16 h-1.5 bg-gradient-to-l from-secondary to-secondary-dark rounded-full mt-5 ${
          lineMargin[align] || lineMargin.center
        }`}
      />
    </div>
  )
}

export default SectionTitle
