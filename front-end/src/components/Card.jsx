function Card({
  children,
  className = "",
  hoverable = false,
  padding = "md",
  glow = false,
  ...props
}) {
  const paddings = { sm: "p-4", md: "p-6", lg: "p-8" }

  return (
    <div
      className={[
        "bg-white/90 backdrop-blur-sm border border-border/60 rounded-2xl transition-all duration-400",
        paddings[padding] || paddings.md,
        hoverable && "hover:-translate-y-2 hover:shadow-xl hover:shadow-black/5 hover:border-secondary/50",
        glow && "animate-glow",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {children}
    </div>
  )
}

export default Card
