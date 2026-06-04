function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-primary-light text-primary",
    secondary: "bg-secondary-light text-primary",
    success: "bg-green-100 text-green-700",
    error: "bg-red-100 text-red-600",
  }

  return (
    <span
      className={[
        "inline-flex items-center px-3 py-1 text-xs font-semibold rounded-full whitespace-nowrap",
        variants[variant] || variants.default,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  )
}

export default Badge
