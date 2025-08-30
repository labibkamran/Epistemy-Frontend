"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Brain, BookOpen, TrendingUp, Calendar, Settings, LogOut, Star, Award, Target } from "lucide-react"

const StudentDashboard = () => {
	const [activeTab, setActiveTab] = useState("overview")

	// Mock data
	const sessions = [
		{
			id: 1,
			tutor: "Sarah Mitchell",
			subject: "Calculus",
			date: "2024-01-15",
			duration: "60 min",
			status: "completed",
			topics: ["Derivatives", "Chain Rule", "Product Rule"],
			progressScore: 85,
			feedback:
				"Great improvement in understanding derivatives! Focus on practicing more complex chain rule problems.",
			quizAvailable: true,
			quizScore: 8,
			quizTotal: 10,
		},
		{
			id: 2,
			tutor: "Sarah Mitchell",
			subject: "Calculus",
			date: "2024-01-08",
			duration: "60 min",
			status: "completed",
			topics: ["Limits", "Continuity", "Basic Derivatives"],
			progressScore: 78,
			feedback:
				"Good foundation in limits. Need to work on derivative notation and basic rules.",
			quizAvailable: true,
			quizScore: 7,
			quizTotal: 10,
		},
		{
			id: 3,
			tutor: "Sarah Mitchell",
			subject: "Calculus",
			date: "2024-01-22",
			duration: "60 min",
			status: "upcoming",
			topics: [],
			progressScore: null,
			feedback: null,
			quizAvailable: false,
			quizScore: null,
			quizTotal: null,
		},
	]

	const stats = {
		totalSessions: 12,
		avgProgress: 82,
		completedQuizzes: 8,
		currentStreak: 5,
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
							onClick={() => setActiveTab("progress")}
							className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg mb-1 ${
								activeTab === "progress"
									? "bg-primary-600 text-white"
									: "text-dark-300 hover:text-white hover:bg-dark-700"
							}`}
						>
							<Target className="h-5 w-5 mr-3" />
							Progress
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
							<h1 className="text-2xl font-bold text-white">Student Dashboard</h1>
							<p className="text-dark-300">Welcome back, Alice Johnson</p>
						</div>
						<button className="btn-primary">Book Session</button>
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
											<BookOpen className="h-6 w-6 text-primary-500" />
										</div>
									</div>
								</div>
								<div className="card">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-dark-400 text-sm">Avg Progress</p>
											<p className="text-2xl font-bold text-white">{stats.avgProgress}%</p>
										</div>
										<div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
											<TrendingUp className="h-6 w-6 text-green-500" />
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
									{sessions.slice(0, 3).map((session) => (
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
													<p className="font-medium text-white">
														{session.subject} with {session.tutor}
													</p>
													<p className="text-sm text-dark-300">
														{session.date} • {session.duration}
													</p>
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

							{/* Next Session */}
							<div className="card">
								<h2 className="text-xl font-semibold text-white mb-4">Next Session</h2>
								<div className="bg-primary-600/10 border border-primary-600/20 rounded-lg p-4">
									<div className="flex items-center justify-between">
										<div>
											<h3 className="font-semibold text-white">Calculus with Sarah Mitchell</h3>
											<p className="text-dark-300">January 22, 2024 • 3:00 PM • 60 minutes</p>
											<p className="text-sm text-primary-400 mt-1">Integration and Area Under Curves</p>
										</div>
										<div className="flex items-center space-x-2">
											<button className="btn-secondary">Reschedule</button>
											<button className="btn-primary">Join Session</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					)}
				</main>
			</div>
		</div>
	)
}

export default StudentDashboard
