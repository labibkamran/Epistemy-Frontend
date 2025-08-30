"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Brain, Eye, EyeOff, Mail, Lock } from "lucide-react"
import { tutorLogin } from "../api/tutor"
import { studentLogin } from "../api/student"
import { setUser } from "../auth"

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [userType, setUserType] = useState("tutor")
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
			if (userType === "tutor") {
				try {
					const { user } = await tutorLogin({ email, password })
					setUser(user)
					navigate("/tutor-dashboard")
				} catch (err) {
					alert(err.message || "Login failed")
				}
				return
			}
			// Student flow (real API)
			try {
				const { user } = await studentLogin({ email, password })
				setUser(user)
				navigate("/student-dashboard")
			} catch (err) {
				alert(err.message || "Login failed")
			}
	}

	return (
		<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold">Welcome back</h2>
					<p className="mt-2 text-dark-300">Sign in to your account to continue</p>
				</div>

				<div className="card">
					{/* User Type Toggle */}
					<div className="flex bg-dark-700 rounded-lg p-1 mb-6">
						<button
							type="button"
							onClick={() => setUserType("tutor")}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								userType === "tutor" ? "bg-primary-600 text-white" : "text-dark-300 hover:text-white"
							}`}
						>
							Tutor
						</button>
						<button
							type="button"
							onClick={() => setUserType("student")}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								userType === "student" ? "bg-primary-600 text-white" : "text-dark-300 hover:text-white"
							}`}
						>
							Student
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div>
							<label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
								Email address
							</label>
							<div className="relative">
								<span className="input-icon">
									<Mail className="h-5 w-5 text-dark-400" />
								</span>
								<input
									id="email"
									name="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="input-field pl-10"
									placeholder="Enter your email"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
								Password
							</label>
							<div className="relative">
								<span className="input-icon">
									<Lock className="h-5 w-5 text-dark-400" />
								</span>
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="input-field pl-10 pr-10"
									placeholder="Enter your password"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="input-action text-dark-400 hover:text-white"
								>
									{showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
								/>
								<label htmlFor="remember-me" className="ml-2 block text-sm text-dark-300">
									Remember me
								</label>
							</div>
							<Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-400">
								Forgot password?
							</Link>
						</div>

						<button type="submit" className="w-full btn-primary">
							Sign in
						</button>
					</form>
				</div>

				<p className="text-center text-dark-400">
					Don't have an account?{" "}
					<Link to="/signup" className="text-primary-500 hover:text-primary-400 font-medium">
						Sign up
					</Link>
				</p>
			</div>
		</div>
	)
}

export default LoginPage
