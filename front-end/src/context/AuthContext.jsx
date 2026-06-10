import { createContext, useContext, useState, useCallback } from "react"

const AuthContext = createContext()

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("takatuf_user")
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback((userData) => {
    setUser(userData)
    localStorage.setItem("takatuf_user", JSON.stringify(userData))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem("takatuf_user")
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used within AuthProvider")
  return ctx
}

export { AuthProvider, useAuth }
