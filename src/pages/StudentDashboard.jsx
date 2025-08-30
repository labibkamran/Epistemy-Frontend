"use client"

import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Brain, BookOpen, TrendingUp, Calendar, Settings, LogOut, Star, Award, Target } from "lucide-react"
import { listStudentSessions, listTutorsWithCalendly } from "../api/student"
import { getUser } from "../auth"

const StudentDashboard = () => {
			const [activeTab, setActiveTab] = useState("overview")
			const [sessions, setSessions] = useState([])
			const [tutors, setTutors] = useState([])
				const [me] = useState(() => getUser())

			useEffect(() => {
			let timer
				if (!me || me.role !== 'student') return
			const load = async () => {
				try {
				const { sessions: raw } = await listStudentSessions(me.id)
				const filtered = (raw || []).filter(s => (s?.status === 'processed' || s?.status === 'published'))
																const mapped = filtered.map(s => {
																		const topicsObj = s.topics || (s.pack && s.pack.topics) || null;
																		const mainTopic = topicsObj?.subject || null;
																		return ({
						id: s._id || s.id,
													tutor: s.tutorName || null,
						subject: s.title || 'Untitled',
						date: s.createdAt ? new Date(s.createdAt).toISOString().slice(0,10) : '',
						duration: '-',
						status: s.status || 'draft',
																	topics: topicsObj,
																	mainTopic: mainTopic || (s.title || null),
						progressScore: s.progress?.score ?? null,
						feedback: s.summary?.executive || null,
						quizAvailable: Array.isArray(s.quiz) && s.quiz.length > 0,
						quizScore: null,
						quizTotal: null,
																})})
					setSessions(mapped)
				} catch (e) {
					if (import.meta?.env?.DEV) console.warn('listStudentSessions failed', e)
				}
			}
			load()
			timer = setInterval(load, 5000)
				return () => timer && clearInterval(timer)
			}, [me])

				// Load tutors with Calendly for Schedule tab
				useEffect(() => {
							const loadTutors = async () => {
											try {
															const { tutors } = await listTutorsWithCalendly();
															setTutors(tutors || []);
											} catch (e) {
															if (import.meta?.env?.DEV) console.warn('listTutorsWithCalendly failed', e)
											}
							};
							loadTutors();
				}, [])

		const stats = useMemo(() => {
			const totalSessions = sessions.length
			// derive a rough avg progress if progressScore exists
			const scores = sessions.map(s => s.progressScore).filter(v => typeof v === 'number')
			const avgProgress = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0) / scores.length) : 0
			const completedQuizzes = 0 // placeholder until attempts model wired on frontend
			const currentStreak = 0 // optional feature; left as 0
			return { totalSessions, avgProgress, completedQuizzes, currentStreak }
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
							<BookOpen className="h-5 w-5 mr-3" />
							My Sessions
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
							Schedule
						</button>
					</div>

					<div className="px-3 mt-8">
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
							<h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
							  <p className="text-dark-300">Welcome back, {me?.name || 'Student'}</p>
						</div>
						<button className="btn-primary">Book Session</button>
					</div>
				</header>

				{/* Content */}
				<main className="p-6">
					{activeTab === "overview" && (
						<div className="space-y-6">
							  {/* Stats Grid */}
							  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								<div className="card">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-dark-400 text-sm">Total Sessions</p>
											<p className="text-2xl font-bold text-white">{stats.totalSessions}</p>
										</div>
										<div className="w-12 h-12 bg-primary-600/20 rounded-lg flex items-center justify-center">
											<BookOpen className="h-6 w-6 text-primary-500" />
										</div>
									</div>
								</div>
								<div className="card">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-dark-400 text-sm">Quizzes Completed</p>
											<p className="text-2xl font-bold text-white">{stats.completedQuizzes}</p>
										</div>
										<div className="w-12 h-12 bg-yellow-600/20 rounded-lg flex items-center justify-center">
											<Award className="h-6 w-6 text-yellow-500" />
										</div>
									</div>
								</div>
								<div className="card">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-dark-400 text-sm">Current Streak</p>
											<p className="text-2xl font-bold text-white">{stats.currentStreak} days</p>
										</div>
										<div className="w-12 h-12 bg-orange-600/20 rounded-lg flex items-center justify-center">
											<Star className="h-6 w-6 text-orange-500" />
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
									  {(sessions || []).slice(0, 3).map((session) => (
										<div key={session.id} className="flex items-center justify-between p-4 bg-dark-700 rounded-lg">
											<div className="flex items-center space-x-4">
												<div
													className={`w-3 h-3 rounded-full ${
														session.status === "completed"
															? "bg-green-500"
															: session.status === "upcoming"
																? "bg-blue-500"
																: "bg-yellow-500"
													}`}
												/>
																							<div>
																								<p className="font-medium text-white">{session.subject}</p>
																								{session.mainTopic && (
																									<p className="text-sm text-dark-300 mt-1">Topic: {session.mainTopic}</p>
																								)}
																							</div>
											</div>
											<div className="flex items-center space-x-2">
												{session.status === "completed" && session.progressScore && (
													<span className="px-2 py-1 bg-green-600/20 text-green-400 text-xs rounded-full">
														{session.progressScore}% Progress
													</span>
												)}
												{session.status === "upcoming" && (
													<span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded-full">Upcoming</span>
												)}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					)}

																			{activeTab === "calendar" && (
																				<div className="space-y-4">
																					<div className="flex items-center justify-between">
																						<h2 className="text-xl font-semibold text-white">Schedule</h2>
																					</div>

																					{(!tutors || tutors.length === 0) ? (
																						<div className="card text-center text-dark-300">No tutors available for booking.</div>
																					) : (
																						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
																							{tutors.map((t) => (
																								<div key={t.id} className="card flex flex-col justify-between">
																									<div>
																										<h3 className="text-white font-semibold">{t.name}</h3>
																										<p className="text-dark-400 text-sm">{t.email}</p>
																									</div>
																									<div className="mt-4">
																										<a href={t.calendlyUrl} target="_blank" rel="noreferrer" className="btn-primary inline-block">Book now</a>
																									</div>
																								</div>
																							))}
																						</div>
																					)}
																				</div>
																			)}
								{activeTab === "sessions" && (
									<div className="space-y-4">
										<div className="flex items-center justify-between">
											<h2 className="text-xl font-semibold text-white">My Sessions</h2>
										</div>

										{(!sessions || sessions.length === 0) ? (
											<div className="card text-center text-dark-300">You have no sessions yet.</div>
										) : (
											<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
												{sessions.map((s) => (
													<div key={s.id} className="card block hover:bg-dark-700/40 transition-colors">
														<div className="flex items-start justify-between">
															<div>
																<h3 className="text-white font-semibold">{s.subject}</h3>
																  <p className="text-dark-400 text-sm">{s.tutor ? `Tutor: ${s.tutor}` : ''}</p>
															</div>
															{/* Status chip removed for students */}
														</div>
														<div className="mt-3 text-sm text-dark-300">
															<div>Date created: {s.date || '-'}</div>
															{s.mainTopic && (
																<div className="mt-1">Topic: {s.mainTopic}</div>
															)}
														</div>
													</div>
												))}
											</div>
										)}
									</div>
								)}
				</main>
			</div>
		</div>
	)
}

export default StudentDashboard
