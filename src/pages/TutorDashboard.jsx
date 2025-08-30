"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Brain,
  Users,
  TrendingUp,
  LogOut,
  Play,
  CheckCircle2,
  Clock,
} from "lucide-react"
import { createTutorSession, listTutorSessions, listStudents, getTutorProfile, updateTutorProfile } from "../api/tutor"
import { clearUser, getUser, setUser } from "../auth"

const TutorDashboard = () => {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("overview")
  const [newTitle, setNewTitle] = useState("")
  const [creating, setCreating] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [students, setStudents] = useState([])
  const [loadingStudents, setLoadingStudents] = useState(false)
  const [selectedStudentId, setSelectedStudentId] = useState("")
  const [showCalendlyModal, setShowCalendlyModal] = useState(false)
  const [calendlyUrlInput, setCalendlyUrlInput] = useState("")
  const [savingCalendly, setSavingCalendly] = useState(false)
  const [showPriceModal, setShowPriceModal] = useState(false)
  const [priceInput, setPriceInput] = useState("")
  const [savingPrice, setSavingPrice] = useState(false)

  // Sessions start empty; filled when the tutor creates one
  const [sessions, setSessions] = useState([])

  // Stats are computed in real-time from the sessions list

  // Students and Calendar pages removed

  const getCurrentUser = () => getUser()

  // Fetch sessions initially and poll for near real-time updates
  useEffect(() => {
    let timer;
    const me = getCurrentUser();
    if (!me || me.role !== 'tutor') return;
    const load = async () => {
  try {
        const { sessions: raw } = await listTutorSessions(me.id)
        const mapped = (raw || []).map((session) => ({
          id: session._id || session.id,
          studentId: session.studentId || null,
          student: session.studentId ? 'Assigned' : 'Unassigned',
          subject: session.title || 'Untitled',
          date: session.createdAt ? new Date(session.createdAt).toISOString().slice(0,10) : new Date().toISOString().slice(0,10),
          duration: '-',
          status: session.status || 'draft',
          paid: Boolean(session.paid),
          aiProcessed: Boolean(session.aiProcessed),
          topics: session.topics || [],
          progressScore: session.progressScore ?? null,
          quizGenerated: Boolean(session.quizGenerated),
        }))
        setSessions(mapped)
      } catch (e) {
        if (import.meta?.env?.DEV) console.warn('listTutorSessions failed', e)
      }
    }
    load()
    timer = setInterval(load, 5000) // 5s polling
    return () => timer && clearInterval(timer)
  }, [])

  // Ensure we have latest profile info (calendlyUrl) after mount
  useEffect(() => {
    const me = getCurrentUser();
    if (!me || me.role !== 'tutor') return;
    (async () => {
      try {
        const { user } = await getTutorProfile(me.id);
        if (user) {
          const changed = (user.calendlyUrl !== me.calendlyUrl) || (user.sessionPrice !== me.sessionPrice);
          if (changed) setUser({ ...me, calendlyUrl: user.calendlyUrl || null, sessionPrice: user.sessionPrice ?? null });
        }
      } catch (e) {
        if (import.meta?.env?.DEV) console.warn('getTutorProfile failed', e)
      }
    })();
  }, [])

  // Load students when opening the create modal (once per session)
  useEffect(() => {
    const loadStudents = async () => {
      if (!showCreateModal) return
      try {
        setLoadingStudents(true)
        const { students } = await listStudents()
        setStudents(students || [])
      } catch (e) {
        if (import.meta?.env?.DEV) console.warn('listStudents failed', e)
      } finally {
        setLoadingStudents(false)
      }
    }
    loadStudents()
  }, [showCreateModal])

  async function handleCreate() {
    if (!newTitle.trim() || !selectedStudentId) return
    const me = getCurrentUser()
    if (!me || me.role !== 'tutor') {
      alert('Please login as tutor first')
      return false
    }
    try {
      setCreating(true)
      const { session } = await createTutorSession({ tutorId: me.id, title: newTitle.trim(), studentId: selectedStudentId })
      // Map backend session to UI shape
      const ui = {
        id: session._id || session.id || Math.random(),
        student: session.studentId ? 'Assigned' : 'Unassigned',
        subject: session.title || 'Untitled',
        date: new Date().toISOString().slice(0, 10),
        duration: '-',
        status: session.status || 'draft',
        aiProcessed: false,
        topics: [],
        progressScore: null,
        quizGenerated: false,
      }
  setSessions((prev) => [ui, ...prev])
      setNewTitle("")
      setSelectedStudentId("")
      setActiveTab('sessions')
      return true
    } catch (err) {
      alert(err.message || 'Failed to create session')
      return false
    } finally {
      setCreating(false)
    }
  }

  // Upload now handled on SessionDetails page

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
          </div>

          <div className="px-3 mt-8">
            <Link
              to="/"
              onClick={() => clearUser()}
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
              <p className="text-dark-300">Welcome back, {getCurrentUser()?.name || 'Tutor'}</p>
            </div>
      {/* Removed Upload Session top button */}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Pricing & Calendly Section */}
              <div className="card">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Scheduling</h3>
                    <p className="text-sm text-dark-400 mt-1">Share or edit your Calendly link so students can book sessions.</p>
                    <div className="mt-3">
                      {getCurrentUser()?.calendlyUrl ? (
                        <div className="flex items-center justify-between bg-dark-700 border border-dark-600 rounded-lg p-3">
                          <a href={getCurrentUser().calendlyUrl} target="_blank" rel="noreferrer" className="text-primary-400 underline truncate max-w-[70%]">
                            {getCurrentUser().calendlyUrl}
                          </a>
                          <button className="btn-secondary" onClick={() => { setCalendlyUrlInput(getCurrentUser().calendlyUrl || ""); setShowCalendlyModal(true); }}>Edit</button>
                        </div>
                      ) : (
                        <button className="btn-primary" onClick={() => { setCalendlyUrlInput(""); setShowCalendlyModal(true); }}>
                          Add Calendly URL
                        </button>
                      )}
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-dark-400">Your session price</p>
                      {getCurrentUser()?.sessionPrice != null ? (
                        <div className="flex items-center justify-between bg-dark-700 border border-dark-600 rounded-lg p-3 mt-1">
                          <span className="text-white font-medium">${getCurrentUser().sessionPrice}</span>
                          <button className="btn-secondary" onClick={() => { setPriceInput(String(getCurrentUser().sessionPrice ?? '')); setShowPriceModal(true); }}>Edit</button>
                        </div>
                      ) : (
                        <button className="btn-primary mt-1" onClick={() => { setPriceInput(""); setShowPriceModal(true); }}>
                          Set session price
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
        {/* Stats Grid (real-time) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-dark-400 text-sm">Total Sessions</p>
          <p className="text-2xl font-bold text-white">{sessions.length}</p>
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
          <p className="text-2xl font-bold text-white">{(() => { const set = new Set(); sessions.forEach(s => { if (s.studentId) set.add(String(s.studentId)) }); return set.size; })()}</p>
                    </div>
                    <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                      <Users className="h-6 w-6 text-green-500" />
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
                  {sessions.length === 0 ? (
                    <div className="p-6 bg-dark-700 rounded-lg text-dark-300">
                      No sessions yet. Click "Create Session" to get started.
                    </div>
                  ) : (
                    sessions.slice(0, 5).map((session) => (
                      <div key={session.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
                        <div className="flex items-center space-x-4">
              <div
                            className={`w-3 h-3 rounded-full ${
                session.status === "processed"
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
              {session.status === "processed" && (
                            <span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Processed
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
                          <button
                            className="btn-secondary"
                            onClick={() => navigate(`/tutor-session/${session.id}`)}
                          >
                            View
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Create Session (trigger via modal) */}
              <div className="card">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">Create a Session</h3>
                    <p className="text-sm text-dark-400">Click the button to enter a title and create your session.</p>
                  </div>
                  <button className="btn-primary" onClick={() => { setNewTitle(""); setSelectedStudentId(""); setShowCreateModal(true); }}>
                    Create Session
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "sessions" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">All Sessions</h2>
                <button className="btn-primary" onClick={() => { setNewTitle(""); setSelectedStudentId(""); setShowCreateModal(true); }}>
                  Create Session
                </button>
              </div>

              {sessions.length === 0 ? (
                <div className="card text-center text-dark-300">You have no sessions yet. Click "Create Session" to add your first.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sessions.map((s) => (
                    <Link
                      key={s.id}
                      to={`/tutor-session/${s.id}`}
                      className="card block hover:bg-dark-700/40 hover:border-primary-600/30 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-white font-semibold">{s.subject}</h3>
                          <p className="text-dark-400 text-sm">{s.student}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${s.status === 'processed' ? 'bg-green-600/20 text-green-400' : 'bg-yellow-600/20 text-yellow-400'}`}>
                          {s.status === 'processed' ? 'Processed' : (s.status || 'Draft')}
                        </span>
                      </div>
                      <div className="mt-3 text-sm text-dark-300">
                        <div>Date: {s.date}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Students and Calendar tabs removed */}
        </main>
      </div>

      {/* Create Session Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="bg-dark-800 border border-dark-700 rounded-xl w-full max-w-md p-6 mx-4">
            <h3 className="text-lg font-semibold text-white">Create Session</h3>
            <p className="text-sm text-dark-400 mt-1 mb-4">Enter a session title and select a student. Transcript upload requires a student.</p>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Calculus - Derivatives"
              className="input-field w-full"
            />
            <div className="mt-3">
              <label className="block text-sm text-dark-300 mb-1">Student</label>
              <select
                className="w-full bg-dark-800 border border-dark-700 rounded-lg p-2 text-white"
                value={selectedStudentId}
                onChange={(e) => setSelectedStudentId(e.target.value)}
              >
                <option value="" disabled>{loadingStudents ? 'Loading students…' : 'Select a student'}</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} ({s.email})</option>
                ))}
              </select>
              {(!loadingStudents && students.length === 0) && (
                <p className="text-xs text-yellow-400 mt-1">No students found. Create student accounts first.</p>
              )}
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn-secondary" onClick={() => setShowCreateModal(false)}>Cancel</button>
              <button
                className="btn-primary"
                disabled={creating || !newTitle.trim() || !selectedStudentId}
                onClick={async () => { const ok = await handleCreate(); if (ok) setShowCreateModal(false); }}
              >
                {creating ? 'Creating…' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Calendly Modal */}
      {showCalendlyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="bg-dark-800 border border-dark-700 rounded-xl w-full max-w-md p-6 mx-4">
            <h3 className="text-lg font-semibold text-white">{getCurrentUser()?.calendlyUrl ? 'Edit Calendly URL' : 'Add Calendly URL'}</h3>
            <p className="text-sm text-dark-400 mt-1 mb-4">Paste your Calendly scheduling link (https://calendly.com/...).</p>
            <input
              type="url"
              value={calendlyUrlInput}
              onChange={(e) => setCalendlyUrlInput(e.target.value)}
              placeholder="https://calendly.com/your-handle"
              className="input-field w-full"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn-secondary" onClick={() => setShowCalendlyModal(false)}>Cancel</button>
              <button
                className="btn-primary"
                disabled={savingCalendly || (!calendlyUrlInput.trim())}
                onClick={async () => {
                  const me = getCurrentUser();
                  if (!me) return;
                  try {
                    setSavingCalendly(true);
                    const url = calendlyUrlInput.trim();
                    const { user } = await updateTutorProfile(me.id, { calendlyUrl: url });
                    if (user) setUser(user);
                    setShowCalendlyModal(false);
                  } catch (err) {
                    alert(err.message || 'Failed to save Calendly URL');
                  } finally {
                    setSavingCalendly(false);
                  }
                }}
              >
                {savingCalendly ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Price Modal */}
      {showPriceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="bg-dark-800 border border-dark-700 rounded-xl w-full max-w-md p-6 mx-4">
            <h3 className="text-lg font-semibold text-white">{getCurrentUser()?.sessionPrice != null ? 'Edit session price' : 'Set session price'}</h3>
            <p className="text-sm text-dark-400 mt-1 mb-4">Enter your price per session. Use a number like 25 or 49.99.</p>
            <input
              type="number"
              min="0"
              step="0.01"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              placeholder="e.g., 25"
              className="input-field w-full"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button className="btn-secondary" onClick={() => setShowPriceModal(false)}>Cancel</button>
              <button
                className="btn-primary"
                disabled={savingPrice || priceInput === '' || Number(priceInput) < 0}
                onClick={async () => {
                  const me = getCurrentUser();
                  if (!me) return;
                  try {
                    setSavingPrice(true);
                    const value = priceInput === '' ? null : Number(priceInput);
                    const { user } = await updateTutorProfile(me.id, { sessionPrice: value });
                    if (user) setUser(user);
                    setShowPriceModal(false);
                  } catch (err) {
                    alert(err.message || 'Failed to save price');
                  } finally {
                    setSavingPrice(false);
                  }
                }}
              >
                {savingPrice ? 'Saving…' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TutorDashboard
