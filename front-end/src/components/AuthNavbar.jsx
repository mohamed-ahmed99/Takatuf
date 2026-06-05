import { Link, useLocation } from "react-router-dom"
import { useState } from "react"
import { IconMenu } from "./Icons"

const links = [
  { href: "/", label: "الرئيسية" },
  { href: "/#how-it-works", label: "كيف يعمل" },
  { href: "/#features", label: "المميزات" },
]

function AuthNavbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 h-[72px] bg-white/95 backdrop-blur-md border-b border-border z-50">
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-10 h-10 flex items-center justify-center bg-primary text-white text-lg font-extrabold rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20">
            ت
          </span>
          <span className="text-2xl font-extrabold text-primary">تكاتف</span>
        </Link>

        <button
          className="lg:hidden p-2 text-primary hover:bg-primary-light rounded-xl transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="القائمة"
        >
          <IconMenu className="w-6 h-6" />
        </button>

        <div className={`max-lg:fixed max-lg:top-[72px] max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:p-6 max-lg:border-b max-lg:border-border max-lg:flex-col max-lg:gap-6 max-lg:shadow-xl max-lg:transition-all max-lg:duration-300 ${open ? "max-lg:translate-y-0 max-lg:opacity-100" : "max-lg:-translate-y-full max-lg:opacity-0 max-lg:pointer-events-none"} flex items-center gap-8`}>
          <ul className="flex max-lg:flex-col items-center max-lg:w-full gap-6 max-lg:text-center">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:right-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all after:duration-300 hover:after:w-full ${
                    pathname === link.href ? "text-primary after:w-full" : "text-text-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default AuthNavbar
