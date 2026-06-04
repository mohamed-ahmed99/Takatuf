function Input({
  label,
  error,
  id,
  type = "text",
  className = "",
  ...props
}) {
  const inputId = id || label?.replace(/\s+/g, "-").toLowerCase()

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-text-dark">
          {label}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        className={[
          "px-4 py-3 border-2 border-border rounded-xl bg-white text-text-dark text-base",
          "transition-all duration-300 placeholder:text-text-muted placeholder:opacity-70",
          "focus:border-secondary focus:shadow-[0_0_0_3px_rgba(150,212,200,0.2)]",
          error && "!border-red-500 focus:!shadow-[0_0_0_3px_rgba(220,38,38,0.1)]",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500">{error}</span>
      )}
    </div>
  )
}

export default Input
