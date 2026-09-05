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
import Profile from "./pages/Profile"
import EditProfile from "./pages/EditProfile"
import Discover from "./pages/Discover"
import Connections from "./pages/Connections"

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

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }

        />

        <Route
          path="/discover"
          element={
            <ProtectedRoute>
              <Discover />
            </ProtectedRoute>
          }

        />

        <Route
          path="/connection"
          element={
            <ProtectedRoute>
              <Connections />
            </ProtectedRoute>
          }

        />


      </Routes>
    </>
  )
}

export default App