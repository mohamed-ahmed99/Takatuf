import { useRef, useEffect, useState } from "react"

export default function useScrollReveal(threshold = 0.1, rootMargin = "0px 0px -50px 0px") {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.unobserve(el)
        }
      },
      { threshold, rootMargin }
    )

    // Small delay to ensure layout is stable before observing
    const timer = setTimeout(() => observer.observe(el), 100)
    return () => {
      clearTimeout(timer)
      observer.disconnect()
    }
  }, [threshold, rootMargin])

  return [ref, visible]
}
