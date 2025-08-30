"use client"

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getTutorSession, uploadTranscript, updateTutorSession } from '../api/tutor'
import { ArrowLeft, Upload, CheckCircle2, Clock, Brain, LogOut, Plus, Trash2, Loader2 } from 'lucide-react'
import { clearUser } from '../auth'

export default function SessionDetails() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [session, setSession] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)
  

  useEffect(() => {
    let mounted = true
    const load = async () => {
      try {
        setLoading(true)
        const { session } = await getTutorSession(id)
        if (mounted) setSession(session)
      } catch (e) {
        if (mounted) setError(e.message || 'Failed to load session')
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    
    return () => { mounted = false }
  }, [id])

  const onUpload = async (file) => {
    if (!file) return
    try {
      if (!session?.studentId) {
        alert('A student must be assigned to this session before uploading the transcript.')
        return
      }
      setUploading(true)
      await uploadTranscript({ sessionId: id, studentId: session.studentId, file })
      // Refresh details after upload
      const { session: fresh } = await getTutorSession(id)
      setSession(fresh)
    } catch (e) {
      alert(e.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  if (loading) return <div className="p-6">Loading…</div>
  if (error) return <div className="p-6 text-red-400">{error}</div>
  if (!session) return <div className="p-6">Not found</div>

  const processed = session.status === 'processed'

  // Simple immutable update helpers
  const setField = (path, value) => {
    setSession((prev) => {
      const copy = JSON.parse(JSON.stringify(prev || {}))
      const parts = path.split('.')
      let cur = copy
      for (let i = 0; i < parts.length - 1; i++) {
        if (!(parts[i] in cur) || typeof cur[parts[i]] !== 'object') cur[parts[i]] = {}
        cur = cur[parts[i]]
      }
      cur[parts[parts.length - 1]] = value
      return copy
    })
  }

  const saveEdits = async () => {
    try {
      setSaving(true)
      const patch = {
        title: session.title,
        summary: session.summary,
        topics: session.topics,
        progress: session.progress,
        quiz: session.quiz,
      }
      const { session: updated } = await updateTutorSession(session._id, patch)
      setSession(updated)
    } catch (e) {
      alert(e.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const printPDF = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-dark-900">
      {/* Sidebar (same as TutorDashboard) */}
      <div className="fixed inset-y-0 left-0 w-64 bg-dark-800 border-r border-dark-700">
        <div className="flex items-center space-x-2 p-6 border-b border-dark-700">
          <Brain className="h-8 w-8 text-primary-500" />
          <span className="text-xl font-bold gradient-text">Epistemy</span>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            <Link to="/tutor-dashboard" className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 text-dark-300 hover:text-white hover:bg-dark-700">
              {/* Simple link back to dashboard */}
              <ArrowLeft className="h-5 w-5 mr-3" /> Back to Dashboard
            </Link>
          </div>

          <div className="px-3 mt-8">
            <Link to="/" onClick={() => clearUser()} className="w-full flex items-center px-3 py-2 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg">
              <LogOut className="h-5 w-5 mr-3" />
              Sign out
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64">
        <header className="bg-dark-800 border-b border-dark-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Session Details</h1>
              <p className="text-dark-300">{session.title || 'Untitled'} • {processed ? 'Processed' : (session.status || 'Draft')}</p>
            </div>
          </div>
        </header>

        <main className="p-6 space-y-6">
          

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <input
                  className="bg-transparent text-xl font-semibold text-white outline-none border-b border-transparent focus:border-dark-600"
                  value={session.title || ''}
                  placeholder="Untitled Session"
                  onChange={(e) => setField('title', e.target.value)}
                />
              </div>
              <div className="relative flex items-center gap-3">
                {processed ? (
                  <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> Processed
                  </span>
                ) : (
                  <span className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded-full inline-flex items-center gap-2">
                    <Clock className="h-4 w-4" /> {session.status || 'draft'}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-dark-700 rounded-lg p-4">
                <p className="text-dark-400 text-sm">Student</p>
                <p className="text-white">{session.studentName || (session.studentId ? 'Assigned' : 'Unassigned')}</p>
              </div>
            </div>
            {processed && (
              <div className="mt-4 flex gap-2">
                <button className="btn-primary" onClick={saveEdits} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</button>
                <button className="btn-secondary" onClick={printPDF}>Export PDF</button>
                {/* Placeholder: Share link could point to a public route with token */}
                {/* <button className="btn-secondary" onClick={copyShareLink}>Copy Share Link</button> */}
              </div>
            )}
          </div>

          {!processed ? (
            <div className="card">
              <h2 className="text-xl font-semibold text-white mb-4">Upload Transcript</h2>
              <input
                id="upload-tx"
                type="file"
                accept=".txt"
                style={{ display: 'none' }}
                onChange={(e) => { const f = e.target.files && e.target.files[0]; if (f) onUpload(f); e.target.value = '' }}
              />
              <button className="btn-primary inline-flex items-center gap-2" disabled={uploading} onClick={() => document.getElementById('upload-tx')?.click()}>
                {uploading ? (<><Loader2 className="h-4 w-4 animate-spin" /> Processing…</>) : (<><Upload className="h-4 w-4" /> Upload .txt Transcript</>)}
              </button>
            </div>
          ) : (
            <>
              {session.summary && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-white mb-2">Executive Summary</h2>
                  <textarea
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg p-3 text-dark-200 leading-relaxed"
                    rows={4}
                    value={session.summary.executive || ''}
                    onChange={(e) => setField('summary.executive', e.target.value)}
                  />
                  {Array.isArray(session.summary.key_points) && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-white mb-1">Key Points</h3>
                      {session.summary.key_points.map((kp, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <span className="text-dark-400 mt-2">•</span>
                          <input
                            className="flex-1 bg-dark-800 border border-dark-700 rounded p-2 text-dark-200"
                            value={kp}
                            onChange={(e) => {
                              const arr = [...session.summary.key_points]
                              arr[i] = e.target.value
                              setField('summary.key_points', arr)
                            }}
                          />
                          <button
                            type="button"
                            className="p-2 rounded hover:bg-dark-700 text-dark-300 hover:text-white"
                            title="Delete key point"
                            onClick={() => {
                              const arr = [...(session.summary.key_points || [])]
                              arr.splice(i, 1)
                              setField('summary.key_points', arr)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-secondary mt-2 inline-flex items-center gap-2"
                        onClick={() => {
                          const arr = Array.isArray(session.summary.key_points) ? [...session.summary.key_points] : []
                          arr.push('')
                          setField('summary.key_points', arr)
                        }}
                      >
                        <Plus className="h-4 w-4" /> Add key point
                      </button>
                    </div>
                  )}
                </div>
              )}

              {session.topics && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-white mb-1">Topic and Subtopics</h2>
                  <p className="text-dark-300 text-sm mb-3">Specify the main Topic below; the list that follows contains its Subtopics.</p>
                  <label className="text-dark-300 text-sm">Topic</label>
                  <textarea
                    className="w-full bg-dark-800 border border-dark-700 rounded-lg p-2 text-primary-400 mb-2"
                    rows={2}
                    value={session.topics.subject || ''}
                    placeholder="Topic"
                    onChange={(e) => setField('topics.subject', e.target.value)}
                  />
                  <h3 className="text-white font-medium mt-2 mb-1">Subtopics</h3>
                  <div className="space-y-2">
                    {Array.isArray(session.topics.subtopics) && session.topics.subtopics.map((st, i) => (
                      <div key={i} className="bg-dark-700 rounded-lg p-3 space-y-2">
                        <input
                          className="w-full bg-transparent text-white font-medium outline-none border-b border-transparent focus:border-dark-600"
                          value={st.title || ''}
                          placeholder="Subtopic title"
                          onChange={(e) => {
                            const arr = [...session.topics.subtopics]
                            arr[i] = { ...arr[i], title: e.target.value }
                            setField('topics.subtopics', arr)
                          }}
                        />
                        <textarea
                          className="w-full bg-dark-800 border border-dark-700 rounded-lg p-2 text-dark-300 text-sm"
                          placeholder="Objective"
                          rows={2}
                          value={st.objective || ''}
                          onChange={(e) => {
                            const arr = [...session.topics.subtopics]
                            arr[i] = { ...arr[i], objective: e.target.value }
                            setField('topics.subtopics', arr)
                          }}
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="p-2 rounded hover:bg-dark-600 text-dark-300 hover:text-white"
                            title="Delete subtopic"
                            onClick={() => {
                              const arr = [...(session.topics.subtopics || [])]
                              arr.splice(i, 1)
                              setField('topics.subtopics', arr)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-secondary mt-2 inline-flex items-center gap-2"
                      onClick={() => {
                        const arr = Array.isArray(session.topics.subtopics) ? [...session.topics.subtopics] : []
                        arr.push({ title: '', objective: '' })
                        setField('topics.subtopics', arr)
                      }}
                    >
                      <Plus className="h-4 w-4" /> Add subtopic
                    </button>
                  </div>
                </div>
              )}

              {session.progress && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-white mb-2">Progress</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-white font-medium mb-1">Improvements</h3>
                      {(session.progress.improvements || []).map((s, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                          <input
                            className="flex-1 bg-dark-800 border border-dark-700 rounded p-2 text-dark-200"
                            value={s}
                            onChange={(e) => {
                              const arr = [...(session.progress.improvements || [])]
                              arr[i] = e.target.value
                              setField('progress.improvements', arr)
                            }}
                          />
                          <button
                            type="button"
                            className="p-2 rounded hover:bg-dark-700 text-dark-300 hover:text-white"
                            title="Delete improvement"
                            onClick={() => {
                              const arr = [...(session.progress.improvements || [])]
                              arr.splice(i, 1)
                              setField('progress.improvements', arr)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-secondary mt-1 inline-flex items-center gap-2"
                        onClick={() => {
                          const arr = Array.isArray(session.progress?.improvements) ? [...session.progress.improvements] : []
                          arr.push('')
                          setField('progress.improvements', arr)
                        }}
                      >
                        <Plus className="h-4 w-4" /> Add improvement
                      </button>
                    </div>
                    <div>
                      <h3 className="text-white font-medium mb-1">Gaps</h3>
                      {(session.progress.gaps || []).map((s, i) => (
                        <div key={i} className="flex items-center gap-2 mb-2">
                          <input
                            className="flex-1 bg-dark-800 border border-dark-700 rounded p-2 text-dark-200"
                            value={s}
                            onChange={(e) => {
                              const arr = [...(session.progress.gaps || [])]
                              arr[i] = e.target.value
                              setField('progress.gaps', arr)
                            }}
                          />
                          <button
                            type="button"
                            className="p-2 rounded hover:bg-dark-700 text-dark-300 hover:text-white"
                            title="Delete gap"
                            onClick={() => {
                              const arr = [...(session.progress.gaps || [])]
                              arr.splice(i, 1)
                              setField('progress.gaps', arr)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="btn-secondary mt-1 inline-flex items-center gap-2"
                        onClick={() => {
                          const arr = Array.isArray(session.progress?.gaps) ? [...session.progress.gaps] : []
                          arr.push('')
                          setField('progress.gaps', arr)
                        }}
                      >
                        <Plus className="h-4 w-4" /> Add gap
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {Array.isArray(session.quiz) && (
                <div className="card">
                  <h2 className="text-xl font-semibold text-white mb-2">Quiz</h2>
                  <div className="space-y-4">
                    {session.quiz.map((q, i) => (
                      <div key={i} className="bg-dark-700 rounded-lg p-4 space-y-2">
                        <input
                          className="w-full bg-transparent text-white font-medium outline-none border-b border-transparent focus:border-dark-600"
                          value={q.q || ''}
                          placeholder={`Question ${i + 1}`}
                          onChange={(e) => {
                            const arr = [...session.quiz]
                            arr[i] = { ...arr[i], q: e.target.value }
                            setField('quiz', arr)
                          }}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {(q.choices || []).map((c, ci) => (
                            <div key={ci} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`answer-${i}`}
                                className="accent-primary-500"
                                checked={q.answer_index === ci}
                                onChange={() => {
                                  const arr = [...session.quiz]
                                  arr[i] = { ...arr[i], answer_index: ci }
                                  setField('quiz', arr)
                                }}
                                title="Mark as correct"
                              />
                              <input
                                className="flex-1 bg-dark-800 border border-dark-700 rounded p-2 text-dark-200"
                                value={c}
                                placeholder={`Choice ${ci + 1}`}
                                onChange={(e) => {
                                  const arr = [...session.quiz]
                                  const choices = [...(arr[i].choices || [])]
                                  choices[ci] = e.target.value
                                  arr[i] = { ...arr[i], choices }
                                  setField('quiz', arr)
                                }}
                              />
                            </div>
                          ))}
                        </div>
                        <textarea
                          className="w-full bg-dark-800 border border-dark-700 rounded-lg p-2 text-dark-300 text-sm"
                          placeholder="Explanation"
                          rows={2}
                          value={q.explanation || ''}
                          onChange={(e) => {
                            const arr = [...session.quiz]
                            arr[i] = { ...arr[i], explanation: e.target.value }
                            setField('quiz', arr)
                          }}
                        />
                        <div className="flex justify-end">
                          <button
                            type="button"
                            className="p-2 rounded hover:bg-dark-600 text-dark-300 hover:text-white"
                            title="Delete question"
                            onClick={() => {
                              const arr = [...(session.quiz || [])]
                              arr.splice(i, 1)
                              setField('quiz', arr)
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="btn-secondary inline-flex items-center gap-2"
                      onClick={() => {
                        const arr = Array.isArray(session.quiz) ? [...session.quiz] : []
                        arr.push({ q: '', choices: ['', '', '', ''], answer_index: 0, explanation: '' })
                        setField('quiz', arr)
                      }}
                    >
                      <Plus className="h-4 w-4" /> Add question
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
      {uploading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="bg-dark-800 border border-dark-700 rounded-xl p-6 flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
            <div>
              <div className="text-white font-medium">Processing transcript…</div>
              <div className="text-dark-300 text-sm">Please wait while we extract topics, summary, progress, and quiz.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
