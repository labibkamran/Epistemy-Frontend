"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Brain, BookOpen, TrendingUp, Calendar, LogOut, ArrowLeft, Play, CheckCircle, XCircle, History, Clock } from "lucide-react"
import { getSessionById, saveQuizAttempt, getSessionAttempts } from "../api/student"
import { getUser, clearUser } from "../auth"

const SessionDetail = () => {
	const { sessionId } = useParams()
	const navigate = useNavigate()
	const [me] = useState(() => getUser())
	const [session, setSession] = useState(null)
	const [loading, setLoading] = useState(true)
	const [showQuiz, setShowQuiz] = useState(false)
	const [showPreviousAttempts, setShowPreviousAttempts] = useState(false)
	const [currentQuestion, setCurrentQuestion] = useState(0)
	const [answers, setAnswers] = useState([])
	const [quizCompleted, setQuizCompleted] = useState(false)
	const [quizScore, setQuizScore] = useState(null)
	const [previousAttempts, setPreviousAttempts] = useState([])

	useEffect(() => {
		if (!me || me.role !== 'student') {
			navigate('/student-dashboard')
			return
		}

		const loadSession = async () => {
			try {
				const { session: sessionData } = await getSessionById(sessionId, me.id)
				setSession(sessionData)
			} catch (error) {
				console.error('Failed to load session:', error)
				navigate('/student-dashboard')
			} finally {
				setLoading(false)
			}
		}

		loadSession()
	}, [sessionId, me, navigate])

	useEffect(() => {
		if (!me || !sessionId) return

		const loadPreviousAttempts = async () => {
			try {
				const { attempts } = await getSessionAttempts(sessionId, me.id)
				setPreviousAttempts(attempts || [])
			} catch (error) {
				console.error('Failed to load previous attempts:', error)
			}
		}

		loadPreviousAttempts()
	}, [sessionId, me])

	const handleStartQuiz = () => {
		setShowQuiz(true)
		setShowPreviousAttempts(false)
		setAnswers(new Array(session.quiz.length).fill(''))
		setCurrentQuestion(0)
		setQuizCompleted(false)
		setQuizScore(null)
	}

	const handleShowPreviousAttempts = () => {
		setShowPreviousAttempts(true)
		setShowQuiz(false)
	}

	const handleAnswerSelect = (answer) => {
		const newAnswers = [...answers]
		newAnswers[currentQuestion] = answer
		setAnswers(newAnswers)
	}

	const handleNextQuestion = () => {
		if (currentQuestion < session.quiz.length - 1) {
			setCurrentQuestion(currentQuestion + 1)
		} else {
			handleSubmitQuiz()
		}
	}

	const handleSubmitQuiz = async () => {
		try {
			const { attempt } = await saveQuizAttempt(sessionId, me.id, answers)
			setQuizScore(attempt.score)
			setQuizCompleted(true)
			// Refresh previous attempts after new attempt
			const { attempts } = await getSessionAttempts(sessionId, me.id)
			setPreviousAttempts(attempts || [])
		} catch (error) {
			console.error('Failed to submit quiz:', error)
		}
	}

	const handleBackToDashboard = () => {
		navigate('/student-dashboard')
	}

	if (loading) {
		return (
			<div className="min-h-screen bg-dark-900 flex items-center justify-center">
				<div className="text-white">Loading session...</div>
			</div>
		)
	}

	if (!session) {
		return (
			<div className="min-h-screen bg-dark-900 flex items-center justify-center">
				<div className="text-white">Session not found</div>
			</div>
		)
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
							onClick={handleBackToDashboard}
							className="w-full flex items-center px-3 py-2 text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-700 rounded-lg mb-1"
						>
							<ArrowLeft className="h-5 w-5 mr-3" />
							Back to Dashboard
						</button>
					</div>

					<div className="px-3 mt-8">
						<button
							onClick={() => {
								clearUser()
								navigate('/')
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
							<h1 className="text-2xl font-bold text-white">Session Details</h1>
							<p className="text-dark-300">{session.title || 'Untitled Session'}</p>
						</div>
						{session.quiz && session.quiz.length > 0 && !showQuiz && !showPreviousAttempts && (
							<div className="flex space-x-3">
								<button
									onClick={handleShowPreviousAttempts}
									className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors flex items-center space-x-2"
								>
									<History className="h-5 w-5" />
									<span>Previous Attempts</span>
								</button>
								<button
									onClick={handleStartQuiz}
									className="btn-primary flex items-center space-x-2"
								>
									<Play className="h-5 w-5" />
									<span>Attempt Quiz</span>
								</button>
							</div>
						)}
					</div>
				</header>

				{/* Content */}
				<main className="p-6">
					{!showQuiz && !showPreviousAttempts ? (
						<div className="space-y-6">
							{/* Session Overview */}
							<div className="card">
								<h2 className="text-xl font-semibold text-white mb-4">Session Overview</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<p className="text-dark-400 text-sm">Tutor</p>
										<p className="text-white font-medium">{session.tutorName || 'Not assigned'}</p>
									</div>
									<div>
										<p className="text-dark-400 text-sm">Status</p>
										<p className="text-white font-medium capitalize">{session.status}</p>
									</div>
									<div>
										<p className="text-dark-400 text-sm">Created</p>
										<p className="text-white font-medium">
											{session.createdAt ? new Date(session.createdAt).toLocaleDateString() : '-'}
										</p>
									</div>
									<div>
										<p className="text-dark-400 text-sm">Quiz Available</p>
										<p className="text-white font-medium">
											{session.quiz && session.quiz.length > 0 ? `${session.quiz.length} questions` : 'No quiz'}
										</p>
									</div>
								</div>
							</div>

							{/* Topics */}
							{session.topics && (
								<div className="card">
									<h2 className="text-xl font-semibold text-white mb-4">Topics Covered</h2>
									<div className="space-y-4">
										<div>
											<h3 className="text-lg font-medium text-white mb-2">{session.topics.subject}</h3>
											{session.topics.subtopics && session.topics.subtopics.length > 0 && (
												<div className="space-y-2">
													{session.topics.subtopics.map((subtopic, index) => (
														<div key={index} className="pl-4 border-l-2 border-primary-500">
															<h4 className="text-white font-medium">{subtopic.title}</h4>
															<p className="text-dark-300 text-sm">{subtopic.objective}</p>
														</div>
													))}
												</div>
											)}
										</div>
									</div>
								</div>
							)}

							{/* Executive Summary */}
							{session.summary && session.summary.executive && (
								<div className="card">
									<h2 className="text-xl font-semibold text-white mb-4">Executive Summary</h2>
									<p className="text-dark-300 leading-relaxed">{session.summary.executive}</p>
								</div>
							)}

							{/* Key Points */}
							{session.summary && session.summary.key_points && session.summary.key_points.length > 0 && (
								<div className="card">
									<h2 className="text-xl font-semibold text-white mb-4">Key Points</h2>
									<ul className="space-y-2">
										{session.summary.key_points.map((point, index) => (
											<li key={index} className="flex items-start space-x-3">
												<CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
												<span className="text-dark-300">{point}</span>
											</li>
										))}
									</ul>
								</div>
							)}

							{/* Misconceptions */}
							{session.summary && session.summary.misconceptions && session.summary.misconceptions.length > 0 && (
								<div className="card">
									<h2 className="text-xl font-semibold text-white mb-4">Common Misconceptions</h2>
									<ul className="space-y-2">
										{session.summary.misconceptions.map((misconception, index) => (
											<li key={index} className="flex items-start space-x-3">
												<XCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
												<span className="text-dark-300">{misconception}</span>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					) : showPreviousAttempts ? (
						/* Previous Attempts Section */
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h2 className="text-xl font-semibold text-white">Previous Quiz Attempts</h2>
								<button
									onClick={() => setShowPreviousAttempts(false)}
									className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
								>
									Back to Session
								</button>
							</div>

							{previousAttempts.length === 0 ? (
								<div className="card text-center text-dark-300">
									<History className="h-16 w-16 text-dark-600 mx-auto mb-4" />
									<p className="text-lg font-medium">No Previous Attempts</p>
									<p className="text-sm">You haven't attempted this quiz yet.</p>
								</div>
							) : (
								<div className="space-y-4">
									{previousAttempts.map((attempt, index) => (
										<div key={index} className="card">
											<div className="flex items-center justify-between">
												<div className="flex items-center space-x-3">
													<Clock className="h-5 w-5 text-dark-400" />
													<div>
														<p className="text-white font-medium">
															Attempt #{previousAttempts.length - index}
														</p>
														<p className="text-dark-400 text-sm">
															{new Date(attempt.createdAt).toLocaleDateString()} at{' '}
															{new Date(attempt.createdAt).toLocaleTimeString()}
														</p>
													</div>
												</div>
												<div className="text-right">
													<div className="text-2xl font-bold text-primary-500">{attempt.score}%</div>
													<p className="text-dark-400 text-sm">Score</p>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					) : (
						<div className="space-y-6">
							{/* Quiz Header */}
							<div className="card">
								<div className="flex items-center justify-between">
									<h2 className="text-xl font-semibold text-white">Quiz</h2>
									<div className="text-dark-300">
										Question {currentQuestion + 1} of {session.quiz.length}
									</div>
								</div>
							</div>

							{/* Quiz Question */}
							{!quizCompleted ? (
								<div className="card">
									<div className="space-y-4">
										<h3 className="text-lg font-medium text-white">
											{session.quiz[currentQuestion].q}
										</h3>
										
										<div className="space-y-3">
											{session.quiz[currentQuestion].choices.map((choice, index) => (
												<button
													key={index}
													onClick={() => handleAnswerSelect(choice)}
													className={`w-full p-4 text-left rounded-lg border-2 transition-colors ${
														answers[currentQuestion] === choice
															? 'border-primary-500 bg-primary-500/20 text-white'
															: 'border-dark-600 text-dark-300 hover:border-dark-500 hover:text-white'
													}`}
												>
													{choice}
												</button>
											))}
										</div>

										<div className="flex justify-between pt-4">
											<button
												onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
												disabled={currentQuestion === 0}
												className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												Previous
											</button>
											<button
												onClick={handleNextQuestion}
												disabled={!answers[currentQuestion]}
												className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
											>
												{currentQuestion === session.quiz.length - 1 ? 'Submit Quiz' : 'Next'}
											</button>
										</div>
									</div>
								</div>
							) : (
								/* Quiz Results */
								<div className="card text-center">
									<div className="space-y-4">
										<h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
										<div className="text-6xl font-bold text-primary-500">{quizScore}%</div>
										<p className="text-dark-300">Your score</p>
										<div className="flex space-x-3 justify-center">
											<button
												onClick={() => setShowQuiz(false)}
												className="px-4 py-2 bg-dark-700 text-white rounded-lg hover:bg-dark-600 transition-colors"
											>
												Back to Session
											</button>
											<button
												onClick={() => setShowPreviousAttempts(true)}
												className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
											>
												View All Attempts
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					)}
				</main>
			</div>
		</div>
	)
}

export default SessionDetail
