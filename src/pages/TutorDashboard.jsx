"use client"

import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  Brain,
  Upload,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  LogOut,
  Play,
  Award,
  DollarSign,
  CheckCircle2,
  Clock,
} from "lucide-react"

const TutorDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const sessions = useMemo(() => [
    {
      id: 1,
      student: "Alice Johnson",
      subject: "Calculus",
      date: "2024-01-15",
      duration: "60 min",
      status: "completed",
      aiProcessed: true,
      topics: ["Derivatives", "Chain Rule", "Product Rule"],
      progressScore: 85,
      quizGenerated: true,
    },
    {
      id: 2,
      student: "Bob Smith",
      subject: "Physics",
      date: "2024-01-14",
      duration: "45 min",
      status: "processing",
      aiProcessed: false,
      topics: ["Kinematics", "Velocity", "Acceleration"],
      progressScore: null,
      quizGenerated: false,
    },
    {
      id: 3,
      student: "Carol Davis",
      subject: "Chemistry",
      date: "2024-01-13",
      duration: "90 min",
      status: "completed",
      aiProcessed: true,
      topics: ["Organic Chemistry", "Functional Groups", "Reactions"],
      progressScore: 92,
      quizGenerated: true,
    },
  ], [])

  const stats = {
    totalSessions: 24,
    activeStudents: 12,
    avgProgress: 87,
    revenue: 2400,
  }

  const students = useMemo(() => {
    const map = new Map()
    sessions.forEach((s) => {
      const entry = map.get(s.student) || { name: s.student, subjects: new Set(), sessions: 0 }
      entry.sessions += 1
      entry.subjects.add(s.subject)
      map.set(s.student, entry)
    })
    return Array.from(map.values()).map((s) => ({
      name: s.name,
      sessions: s.sessions,
      subjects: Array.from(s.subjects).join(", "),
    }))
  }, [sessions])

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-700">
        <div className="flex items-center space-x-2 p-6 border-b border-dark-700">
          <Brain className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-bold gradient-text">Epistemy</span>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 ${
                activeTab === "overview"
                  ? "bg-primary-600 text-white"
                  : "text-dark-300 hover:text-white hover:bg-dark-700"
              }`}
            >
              <TrendingUp className="h-5 w-5 mr-3" />
              Overview
            </button>
            <button
              onClick={() => setActiveTab("sessions")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 ${
                activeTab === "sessions"
                  ? "bg-primary-600 text-white"
                  : "text-dark-300 hover:text-white hover:bg-dark-700"
              }`}
            >
              <Play className="h-5 w-5 mr-3" />
              Sessions
            </button>
            <button
              onClick={() => setActiveTab("students")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 ${
                activeTab === "students"
                  ? "bg-primary-600 text-white"
                  : "text-dark-300 hover:text-white hover:bg-dark-700"
              }`}
            >
              <Users className="h-5 w-5 mr-3" />
              Students
            </button>
            <button
              onClick={() => setActiveTab("calendar")}
              className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 ${
                activeTab === "calendar"
                  ? "bg-primary-600 text-white"
                  : "text-dark-300 hover:text-white hover:bg-dark-700"
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              Calendar
            </button>
          </div>

          <div className="px-3 mt-8">
            <p className="px-3 text-xs font-semibold text-dark-400 uppercase tracking-wider">Account</p>
            <button className="w-full flex items-center px-3 py-2 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg mt-2">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </button>
            <Link
              to="/"
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg"
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </Link>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-dark-800 border-b border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Tutor Dashboard</h1>
              <p className="text-dark-300">Welcome back, Sarah Mitchell</p>
            </div>
            <button className="btn-primary flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Upload Session
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-400 text-sm">Total Sessions</p>
                      <p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
                    </div>
                    <div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
                      <Play className="h-6 w-6 text-primary-500" />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-400 text-sm">Active Students</p>
                      <p className="text-2xl font-bold text-white">{stats.activeStudents}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-400 text-sm">Average Progress</p>
                      <p className="text-2xl font-bold text-white">{stats.avgProgress}%</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-500" />
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-400 text-sm">Revenue (USD)</p>
                      <p className="text-2xl font-bold text-white">${stats.revenue}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-blue-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Sessions */}
              <div className="card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">Recent Sessions</h2>
                  <button
                    onClick={() => setActiveTab("sessions")}
                    className="text-primary-500 hover:text-primary-400 text-sm font-medium"
                  >
                    View all
                  </button>
                </div>
                <div className="space-y-4">
                  {sessions.slice(0, 5).map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            session.status === "completed"
                              ? "bg-green-500"
                              : session.status === "processing"
                                ? "bg-yellow-500"
                                : "bg-blue-500"
                          }`}
                        />
                        <div>
                          <p className="font-medium text-white">
                            {session.subject} • {session.student}
                          </p>
                          <p className="text-sm text-dark-300">
                            {session.date} • {session.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.status === "completed" && (
                          <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                          </span>
                        )}
                        {session.status === "processing" && (
                          <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> Processing
                          </span>
                        )}
                        {session.aiProcessed && (
                          <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full">AI Ready</span>
                        )}
                        <button className="btn-secondary">{session.status === "completed" ? "View Report" : "Details"}</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Upload */}
              <div className="card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">Upload a New Session</h3>
                    <p className="text-sm text-dark-400">Upload a recording to auto-generate notes and quizzes.</p>
                  </div>
                  <button className="btn-primary flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">All Sessions</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-dark-400">
                      <th className="py-2">Student</th>
                      <th className="py-2">Subject</th>
                      <th className="py-2">Date</th>
                      <th className="py-2">Duration</th>
                      <th className="py-2">Status</th>
                      <th className="py-2">AI</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((s) => (
                      <tr key={s.id} className="border-t border-dark-700">
                        <td className="py-3 text-white">{s.student}</td>
                        <td className="py-3 text-white">{s.subject}</td>
                        <td className="py-3 text-dark-300">{s.date}</td>
                        <td className="py-3 text-dark-300">{s.duration}</td>
                        <td className="py-3">
                          {s.status === "completed" ? (
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">Completed</span>
                          ) : (
                            <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full">Processing</span>
                          )}
                        </td>
                        <td className="py-3">
                          {s.aiProcessed ? (
                            <span className="px-2 py-1 bg-primary-600/20 text-primary-400 text-xs rounded-full">Ready</span>
                          ) : (
                            <span className="px-2 py-1 bg-dark-700 text-dark-300 text-xs rounded-full">Pending</span>
                          )}
                        </td>
                        <td className="py-3">
                          <button className="btn-secondary">{s.status === "completed" ? "Open" : "Details"}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Students</h2>
              <div className="space-y-3">
                {students.map((st) => (
                  <div key={st.name} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                    <div>
                      <p className="font-medium text-white">{st.name}</p>
                      <p className="text-sm text-dark-300">Subjects: {st.subjects}</p>
                    </div>
                    <div className="text-dark-300">{st.sessions} sessions</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "calendar" && (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Calendar</h2>
              <div className="p-6 bg-dark-700 rounded-lg text-dark-300">Calendar view coming soon.</div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default TutorDashboard
