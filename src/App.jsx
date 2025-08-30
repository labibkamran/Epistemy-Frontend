
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import StudentDashboard from './pages/StudentDashboard'
import TutorDashboard from './pages/TutorDashboard'
import SessionDetails from './pages/TutorSessionDetail'
import SessionDetail from './pages/StudentSessionDetail'
import FeaturesPage from './pages/FeaturesPage'
function App() {
 

  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/tutor-session/:id" element={<SessionDetails />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/session/:sessionId" element={<SessionDetail />} />
          <Route path="/terms" element={<div className="pt-24 px-6">Terms of Service (placeholder)</div>} />
          <Route path="/privacy" element={<div className="pt-24 px-6">Privacy Policy (placeholder)</div>} />
        </Routes>
      </main>
    </>
  )
}

export default App
