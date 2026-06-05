import { Routes, Route } from "react-router-dom"
import Landing from "./pages/Landing/Landing"
import AuthPage from "./pages/Auth/AuthPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}

export default App
