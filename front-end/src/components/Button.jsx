function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className = "",
  ...props
}) {
  const base = "inline-flex items-center justify-center gap-2.5 font-bold rounded-2xl transition-all duration-400 select-none cursor-pointer"

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-base",
    lg: "px-9 py-4.5 text-lg",
    xl: "px-12 py-6 text-xl rounded-2xl",
  }

  const variants = {
    primary:
      "bg-primary text-white shadow-md shadow-primary/20 hover:bg-primary-dark hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/30 active:translate-y-0 active:shadow-md",
    secondary:
      "bg-secondary text-primary shadow-md shadow-secondary/20 hover:bg-secondary-dark hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/30 active:translate-y-0 active:shadow-md",
    outline:
      "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white hover:-translate-y-1 hover:shadow-lg",
    "outline-secondary":
      "border-2 border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-primary hover:-translate-y-1 hover:shadow-lg",
    ghost:
      "text-text-muted bg-transparent hover:bg-primary-light hover:text-primary",
  }

  const cls = [
    base,
    sizes[size] || sizes.md,
    variants[variant] || variants.primary,
    (disabled || loading) && "opacity-50 cursor-not-allowed pointer-events-none",
    loading && "relative text-transparent",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled || loading} {...props}>
      {loading && (
        <span className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  )
}

export default Button
