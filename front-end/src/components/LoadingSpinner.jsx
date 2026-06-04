function LoadingSpinner({ size = "md", text = "جاري التحميل..." }) {
  const sizes = { sm: "w-6 h-6 border-2", md: "w-10 h-10 border-[3px]", lg: "w-14 h-14 border-4" }

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12">
      <div
        className={`rounded-full border-border border-t-secondary animate-spin ${sizes[size] || sizes.md}`}
      />
      {text && <p className="text-sm text-text-muted">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
