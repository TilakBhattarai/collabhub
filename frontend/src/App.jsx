import { Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Home from "./pages/Home"
import About from "./pages/About"
import Navbar from "./components/Navbar"
import Toast from "./components/Toast"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import GuestRoute from "./components/GuestRoute"

function App() {

  return (
    <>
      <Toast />
      <Navbar />
      <Routes>
        <Route path="/register" element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        } />
        <Route path="/" element={
          <GuestRoute>
            <Home />
          </GuestRoute>
        } />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={
          <GuestRoute>
            <Login />
          </GuestRoute>}
        />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App