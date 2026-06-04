import { useState, useEffect } from "react"
import Button from "./Button"
import { IconMenu } from "./Icons"

function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const links = [
    { href: "#how-it-works", label: "كيف يعمل" },
    { href: "#features", label: "المميزات" },
    { href: "#statistics", label: "الإحصائيات" },
    { href: "#testimonials", label: "قصص النجاح" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <span className="w-10 h-10 flex items-center justify-center bg-primary text-white text-lg font-extrabold rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30">
            ت
          </span>
          <span className={`text-2xl font-extrabold transition-colors duration-500 ${scrolled ? "text-primary" : "text-white"}`}>
            تكاتف
          </span>
        </a>

        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${scrolled ? "text-primary hover:bg-primary-light" : "text-white hover:bg-white/10"}`}
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          <IconMenu className="w-6 h-6" />
        </button>

        <div className={`max-lg:fixed max-lg:top-[72px] max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:p-6 max-lg:border-b max-lg:border-border max-lg:flex-col max-lg:gap-6 max-lg:shadow-xl max-lg:transition-all max-lg:duration-300 ${open ? "max-lg:translate-y-0 max-lg:opacity-100" : "max-lg:-translate-y-full max-lg:opacity-0 max-lg:pointer-events-none"} flex items-center gap-8`}>
          <ul className="flex max-lg:flex-col items-center max-lg:w-full gap-6 max-lg:text-center">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled ? "text-text-muted hover:text-primary" : "text-white/70 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2 max-lg:justify-center">
            <Button variant={scrolled ? "ghost" : "ghost"} size="sm">دخول</Button>
            <Button variant="primary" size="sm">إنشاء حساب</Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
