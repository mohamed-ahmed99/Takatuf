function Container({ children, className = "", as: Tag = "div" }) {
  return (
    <Tag className={`w-full max-w-[1200px] mx-auto px-6 ${className}`}>
      {children}
    </Tag>
  )
}

export default Container
