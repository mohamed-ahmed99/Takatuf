import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button"
import { useToast } from "../../context/ToastContext"
import { useAuth } from "../../context/AuthContext"
import logoSrc from "../../assets/logo.png"

function OTPPage() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { login: authLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState(["", "", "", "", "", ""])
  const [timer, setTimer] = useState(600)
  const canResend = timer <= 0
  const inputRefs = useRef([])

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (timer <= 0) return
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newCode = [...code]
    newCode[index] = value.slice(-1)
    setCode(newCode)

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    if (newCode.every((d) => d !== "")) {
      handleSubmit(newCode.join(""))
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6)
    if (!pasted) return
    const newCode = pasted.split("").concat(Array(6).fill("")).slice(0, 6)
    setCode(newCode)
    const nextEmpty = newCode.findIndex((d) => d === "")
    inputRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus()
    if (newCode.every((d) => d !== "")) {
      handleSubmit(newCode.join(""))
    }
  }

  const handleSubmit = async (codeStr) => {
    if (!codeStr) codeStr = code.join("")
    if (codeStr.length !== 6) return

    setLoading(true)
    try {
      /* 
      // 🚧 Backend endpoint doesn't exist yet, mocking the request
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/verify-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ code: codeStr }),
      })
      const data = await response.json()
      */
      
      // Mocking successful response to bypass the 404 error
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
      const data = { status: "success", user: { name: "Test User", email: "test@example.com", role: "user" } };

      if (data.status === "success") {
        authLogin(data.user || data)
        addToast("تم توثيق البريد بنجاح!", "success")
        setTimeout(() => navigate("/dashboard"), 1000)
      } else {
        addToast(data.message || "كود غير صحيح", "error")
        setCode(["", "", "", "", "", ""])
        inputRefs.current[0]?.focus()
      }
    } catch {
      addToast("فشل الاتصال بالخادم", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setTimer(600)
    setCode(["", "", "", "", "", ""])
    inputRefs.current[0]?.focus()
    addToast("تم إعادة إرسال الكود على بريدك الإلكتروني", "success")
  }

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(5,36,64,0.15)] p-8 sm:p-10 text-center">

          <img src={logoSrc} alt="تكاتف" className="w-16 h-16 mx-auto rounded-2xl object-cover mb-6 shadow-lg shadow-primary/10" />

          <h1 className="text-2xl font-extrabold text-primary mb-2">توثيق البريد الإلكتروني</h1>
          <p className="text-text-muted text-sm leading-relaxed mb-8">
            أرسلنا كود مكوّن من 6 أرقام على بريدك الإلكتروني. أدخل الكود أدناه لتوثيق حسابك.
          </p>

          <div className="flex justify-center gap-3 mb-6" onPaste={handlePaste}>
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputRefs.current[i] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 text-center text-xl font-bold text-primary bg-bg-light border-2 border-border rounded-xl focus:border-secondary focus:shadow-[0_0_0_3px_rgba(150,212,200,0.2)] outline-none transition-all duration-300"
              />
            ))}
          </div>

          <Button
            variant="primary"
            size="lg"
            loading={loading}
            onClick={() => handleSubmit()}
            className="w-full mb-6"
          >
            توثيق
          </Button>

          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            {canResend ? (
              <button onClick={handleResend} className="text-secondary font-semibold hover:text-secondary-dark transition-colors">
                إعادة إرسال الكود
              </button>
            ) : (
              <span>إعادة الإرسال خلال <span className="font-bold text-primary">{formatTime(timer)}</span></span>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

export default OTPPage
