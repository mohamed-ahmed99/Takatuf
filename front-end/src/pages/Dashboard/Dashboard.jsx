import { useAuth } from "../../context/AuthContext"
import Container from "../../components/Container"
import Button from "../../components/Button"
import { IconHeart, IconHandshake, IconBuilding, IconUsers } from "../../components/Icons"
import logoSrc from "../../assets/logo.png"

const userStats = [
  { icon: IconHeart, label: "تبرعاتي", value: "12", color: "text-rose-500 bg-rose-50 border-rose-200" },
  { icon: IconHandshake, label: "حالات ساعدتها", value: "8", color: "text-emerald-500 bg-emerald-50 border-emerald-200" },
  { icon: IconUsers, label: "جمعيات موثقة", value: "5", color: "text-blue-500 bg-blue-50 border-blue-200" },
]

const charityStats = [
  { icon: IconBuilding, label: "حالات مستلمة", value: "24", color: "text-teal-500 bg-teal-50 border-teal-200" },
  { icon: IconHandshake, label: "مستفيدون", value: "156", color: "text-emerald-500 bg-emerald-50 border-emerald-200" },
  { icon: IconHeart, label: "تبرعات", value: "89", color: "text-rose-500 bg-rose-50 border-rose-200" },
]

function Dashboard() {
  const { user, logout } = useAuth()
  const isCharity = user?.accountType === "charity" || user?.role === "charity"
  const stats = isCharity ? charityStats : userStats

  return (
    <div className="min-h-screen bg-bg-light" dir="rtl">
      <header className="bg-white border-b border-border">
        <Container className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img src={logoSrc} alt="تكاتف" className="w-9 h-9 rounded-xl object-cover" />
            <span className="text-lg font-extrabold text-primary">تكاتف</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-text-muted">
              {user?.fullName || user?.name || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={logout}>
              تسجيل خروج
            </Button>
          </div>
        </Container>
      </header>

      <main className="py-8">
        <Container>
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-primary">
              مرحباً {user?.fullName || user?.name || ""}
            </h1>
            <p className="text-text-muted mt-1">
              {isCharity ? "لوحة تحكم الجمعية الخيرية" : "لوحة التحكم الشخصية"}
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className={`p-5 rounded-2xl border bg-white ${stat.color} bg-opacity-50`}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-text-muted">{stat.label}</span>
                  </div>
                  <span className="text-3xl font-extrabold text-primary">{stat.value}</span>
                </div>
              )
            })}
          </div>

          <div className="bg-white rounded-2xl border border-border p-8 text-center">
            <IconBuilding className="w-12 h-12 mx-auto text-text-muted mb-4" />
            <h2 className="text-xl font-bold text-primary mb-2">
              {isCharity ? "إدارة الحالات والطلبات" : "تصفح حالات المساعدة"}
            </h2>
            <p className="text-text-muted text-sm max-w-md mx-auto mb-6">
              {isCharity
                ? "سيتم إضافة إدارة الحالات والتبرعات قريباً"
                : "ابحث عن حالات تحتاج مساعدة وتبرع للأسر المحتاجة"}
            </p>
            <Button variant="primary" size="lg" disabled>
              {isCharity ? "قريباً" : "تصفح الحالات"}
            </Button>
          </div>
        </Container>
      </main>
    </div>
  )
}

export default Dashboard
