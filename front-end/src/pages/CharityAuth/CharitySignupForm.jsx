import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Input from "../../components/Input"
import Button from "../../components/Button"
import ProfileUpload from "../../components/ProfileUpload"
import FileUpload from "../../components/FileUpload"
import { useToast } from "../../context/ToastContext"
import { useAuth } from "../../context/AuthContext"

function placeholderFile() {
  const canvas = document.createElement('canvas')
  canvas.width = 100; canvas.height = 100
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#052440'
  ctx.fillRect(0, 0, 100, 100)
  ctx.fillStyle = '#96D4C8'
  ctx.font = 'bold 40px sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText('ت', 50, 55)
  return new Promise((resolve) => canvas.toBlob((b) => resolve(new File([b], 'placeholder.png', { type: 'image/png' }))))
}

function CharitySignupForm() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { login: authLogin } = useAuth()
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState({ profileImage: null, coverImage: null, document: null })
  const [form, setForm] = useState({
    name: "", email: "", phoneNumber: "",
    licenseNumber: "", address: "",
    password: "", confirmPassword: "",
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" })
  }

  const handleCoverChange = (e) => {
    setFiles({ ...files, coverImage: e.target.files[0] })
  }

  const handleProfileChange = (e) => {
    setFiles({ ...files, profileImage: e.target.files[0] })
  }

  const handleFileChange = (e) => {
    setFiles({ ...files, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = {}
    if (!form.name.trim()) newErrors.name = "اسم الجمعية مطلوب"
    if (!form.email.trim()) newErrors.email = "البريد الإلكتروني مطلوب"
    if (!form.phoneNumber.trim()) newErrors.phoneNumber = "رقم الهاتف مطلوب"
    if (!form.licenseNumber.trim()) newErrors.licenseNumber = "رقم الترخيص مطلوب"
    if (!form.password.trim()) newErrors.password = "كلمة المرور مطلوبة"
    if (form.password.length < 6) newErrors.password = "يجب أن تكون 6 أحرف على الأقل"
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = "كلمة المرور غير متطابقة"
    if (Object.keys(newErrors).length) return setErrors(newErrors)

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("name", form.name)
      formData.append("email", form.email)
      formData.append("phoneNumber", form.phoneNumber)
      formData.append("password", form.password)
      formData.append("accountType", "charity")
      formData.append("licenseNumber", form.licenseNumber)
      formData.append("address", form.address)
      formData.append("profileImage", files.profileImage || await placeholderFile())
      formData.append("coverImage", files.coverImage || await placeholderFile())
      formData.append("document", files.document || await placeholderFile())

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/auth/sign-up`, {
        method: 'POST', body: formData,
      })
      const data = await response.json()

      if (!response.ok) {
        setErrors({ form: data.message || "فشل تسجيل الجمعية" })
        addToast(data.message || "فشل تسجيل الجمعية", "error")
      } else {
        authLogin(data.user || data)
        addToast("تم تسجيل الجمعية بنجاح! سيتم مراجعة طلبك قريباً", "success")
        setTimeout(() => navigate("/dashboard"), 1000)
      }
    } catch (error) {
      setErrors({ form: "فشل الاتصال بالخادم، تحقق من اتصالك" })
      addToast("فشل الاتصال بالخادم", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <ProfileUpload
        coverImage={files.coverImage}
        profileImage={files.profileImage}
        onCoverChange={handleCoverChange}
        onProfileChange={handleProfileChange}
      />

      <Input label="اسم الجمعية" name="name" placeholder="اسم الجمعية الخيرية" value={form.name} onChange={handleChange} error={errors.name} />

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="البريد الإلكتروني" name="email" type="email" dir="ltr" placeholder="admin@charity.org" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="رقم الهاتف" name="phoneNumber" type="tel" dir="ltr" placeholder="0100 000 0000" value={form.phoneNumber} onChange={handleChange} error={errors.phoneNumber} />
      </div>

      <Input label="رقم الترخيص الرسمي" name="licenseNumber" placeholder="رقم ترخيص وزارة التضامن" value={form.licenseNumber} onChange={handleChange} error={errors.licenseNumber} />
      <Input label="العنوان" name="address" placeholder="مقر الجمعية" value={form.address} onChange={handleChange} error={errors.address} />

      <div>
        <label className="block text-sm font-bold text-primary mb-2">وثيقة الترخيص (PDF)</label>
        <FileUpload name="document" accept="image/*,.pdf" file={files.document} onChange={handleFileChange} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Input label="كلمة المرور" name="password" type="password" dir="ltr" placeholder="••••••••" value={form.password} onChange={handleChange} error={errors.password} />
        <Input label="تأكيد كلمة المرور" name="confirmPassword" type="password" dir="ltr" placeholder="••••••••" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
      </div>

      <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 text-sm text-primary leading-relaxed">
        <p className="font-semibold mb-1">ملحوظة:</p>
        بعد التسجيل، سيتم مراجعة طلبك من قبل فريق تكاتف والتأكد من ترخيص الجمعية قبل تفعيل الحساب.
      </div>

      <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">تسجيل الجمعية</Button>
    </form>
  )
}

export default CharitySignupForm
