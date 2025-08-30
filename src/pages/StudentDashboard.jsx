"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Brain, BookOpen, TrendingUp, Calendar, Settings, LogOut, Star, Award, Target, X, CreditCard, CheckCircle } from "lucide-react"
import { listStudentSessions, listTutorsWithCalendly, getStudentStats } from "../api/student"
import { getUser, clearUser } from "../auth"

const StudentDashboard = () => {
			const [activeTab, setActiveTab] = useState("overview")
			const [sessions, setSessions] = useState([])
			const [tutors, setTutors] = useState([])
			const [showPaymentModal, setShowPaymentModal] = useState(false)
			const [selectedTutor, setSelectedTutor] = useState(null)
			const [stats, setStats] = useState({ totalSessions: 0, avgProgress: 0, completedQuizzes: 0 })
			const navigate = useNavigate()
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

			// Load student statistics
			useEffect(() => {
				if (!me || me.role !== 'student') return
				
				const loadStats = async () => {
					try {
						const statsData = await getStudentStats(me.id)
						setStats(statsData)
					} catch (e) {
						if (import.meta?.env?.DEV) console.warn('getStudentStats failed', e)
					}
				}
				
				loadStats()
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

		const handleBookNow = (tutor) => {
			setSelectedTutor(tutor)
			setShowPaymentModal(true)
		}

		const handlePayNow = () => {
			if (selectedTutor?.calendlyUrl) {
				window.open(selectedTutor.calendlyUrl, '_blank')
				setShowPaymentModal(false)
				setSelectedTutor(null)
			}
		}

		const handleSessionClick = (sessionId) => {
			navigate(`/session/${sessionId}`)
		}

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
						<button
							onClick={() => {
								clearUser();
								navigate('/');
							}}
							className="w-full flex items-center px-3 py-2 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg"
						>
							<LogOut className="h-5 w-5 mr-3" />
							Sign out
						</button>
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
						<button 
							onClick={() => setActiveTab("calendar")}
							className="btn-primary"
						>
							Book Session
						</button>
					</div>
				</header>

				{/* Content */}
				<main className="p-6">
					{activeTab === "overview" && (
						<div className="space-y-6">
							  {/* Stats Grid */}
							  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
																										<p className="text-dark-400 text-sm mt-1">Sessions: {t.sessionCount || 0}</p>
																										<p className="text-dark-400 text-sm mt-1">Price: ${t.sessionPrice || 0}</p>
																									</div>
																									<div className="mt-4">
																										<button 
																											onClick={() => handleBookNow(t)}
																											className="btn-primary inline-block"
																										>
																											Book now
																										</button>
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
													<div 
														key={s.id} 
														className="card block hover:bg-dark-700/40 transition-colors cursor-pointer"
														onClick={() => handleSessionClick(s.id)}
													>
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

				{/* Payment Verification Modal */}
				{showPaymentModal && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
						<div className="bg-dark-800 rounded-lg p-6 w-96 max-w-md mx-4">
							<div className="flex items-center justify-between mb-4">
								<h3 className="text-xl font-semibold text-white">Payment Verification</h3>
								<button
									onClick={() => {
										setShowPaymentModal(false)
										setSelectedTutor(null)
									}}
									className="text-dark-400 hover:text-white"
								>
									<X className="h-5 w-5" />
								</button>
							</div>
							
							<div className="space-y-4">
								<div className="flex items-center space-x-3 p-3 bg-dark-700 rounded-lg">
									<CreditCard className="h-6 w-6 text-primary-500" />
									<div>
										<p className="text-white font-medium">Tutor: {selectedTutor?.name}</p>
										<p className="text-dark-400 text-sm">Session Price: ${selectedTutor?.sessionPrice || 0}</p>
									</div>
								</div>
								
								<div className="p-4 bg-green-600/20 border border-green-600/30 rounded-lg">
									<div className="flex items-center space-x-2">
										<CheckCircle className="h-5 w-5 text-green-500" />
										<span className="text-green-400 text-sm font-medium">Payment Verified</span>
									</div>
									<p className="text-green-300 text-xs mt-1">Your payment has been processed successfully</p>
								</div>
								
								<div className="flex space-x-3">
									<button
										onClick={() => {
											setShowPaymentModal(false)
											setSelectedTutor(null)
										}}
										className="flex-1 px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
									>
										Cancel
									</button>
									<button
										onClick={handlePayNow}
										className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
									>
										Pay Now
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default StudentDashboard
