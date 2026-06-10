import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing/Landing"
import AuthPage from "./pages/UserAuth/AuthPage"
import CharityAuth from "./pages/CharityAuth/CharityAuth"
import Dashboard from "./pages/Dashboard/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/charity" element={<CharityAuth />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
