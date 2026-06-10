import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { IconMenu } from "./Icons"
import logoSrc from "../assets/logo.png"

const links = [
  { href: "#how-it-works", label: "إزاي بتشتغل" },
  { href: "#features",     label: "ليه تكاتف" },
  { href: "#statistics",   label: "تكاتف بالأرقام" },
  { href: "#testimonials", label: "قصص من تكاتف" },
]

function Navbar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[72px] z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <img
            src={logoSrc}
            alt="تكاتف"
            className="w-10 h-10 rounded-xl object-cover transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/25"
          />
          <span className={`text-2xl font-black tracking-tight transition-colors duration-500 ${scrolled ? "text-primary" : "text-white"}`}>
            تكاتف
          </span>
        </a>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 rounded-xl transition-colors ${
            scrolled ? "text-primary hover:bg-primary/8" : "text-white hover:bg-white/10"
          }`}
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          <IconMenu className="w-6 h-6" />
        </button>

        {/* Desktop & Mobile menu */}
        <div className={`max-lg:fixed max-lg:top-[72px] max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:p-6 max-lg:border-b max-lg:border-border max-lg:flex-col max-lg:gap-6 max-lg:shadow-xl max-lg:transition-all max-lg:duration-300 ${open ? "max-lg:translate-y-0 max-lg:opacity-100" : "max-lg:-translate-y-full max-lg:opacity-0 max-lg:pointer-events-none"} flex items-center gap-8`}>
          <ul className="flex max-lg:flex-col items-center max-lg:w-full gap-6 max-lg:text-center">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-semibold transition-all duration-300 relative after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled ? "text-text-muted hover:text-primary" : "text-white/75 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 max-lg:justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/auth")}
              className={!scrolled ? "text-white hover:bg-white/10 hover:text-white" : ""}
            >
              دخول
            </Button>
            <Button
              variant={scrolled ? "primary" : "secondary"}
              size="sm"
              onClick={() => navigate("/auth?tab=signup")}
            >
              حساب جديد
            </Button>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Navbar
