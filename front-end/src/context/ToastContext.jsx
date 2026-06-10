import React, { createContext, useContext, useState, useCallback } from "react"
import { IconCheckCircle, IconBan, IconX } from "../components/Icons"

const ToastContext = createContext()

function Toast({ message, type, id, onRemove }) {
  const icons = { success: IconCheckCircle, error: IconBan }
  const Icon = icons[type] || IconCheckCircle
  const colors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
  }

  return (
    <div
      className={`flex items-start gap-3 px-5 py-4 rounded-2xl border shadow-lg shadow-black/5 animate-slide-left min-w-[320px] max-w-[420px] ${colors[type] || colors.success}`}
    >
      <Icon className="w-5 h-5 shrink-0 mt-0.5" />
      <p className="text-sm font-medium leading-relaxed flex-1">{message}</p>
      <button onClick={() => onRemove(id)} className="shrink-0 p-1 rounded-lg hover:bg-black/5 transition-colors">
        <IconX className="w-4 h-4" />
      </button>
    </div>
  )
}

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "error", duration = 5000) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    if (duration > 0) {
      setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
    }
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-3 pointer-events-none">
        {toasts.map((t) => (
          <div key={t.id} className="pointer-events-auto">
            <Toast {...t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error("useToast must be used within ToastProvider")
  return ctx
}

export { ToastProvider, useToast }
