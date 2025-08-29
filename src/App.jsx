
import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'

function App() {
 

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/tutor-dashboard" element={<div className="pt-24 px-6">Tutor Dashboard (placeholder)</div>} />
          <Route path="/student-dashboard" element={<div className="pt-24 px-6">Student Dashboard (placeholder)</div>} />
        </Routes>
      </main>
    </>
  )
}

export default App
