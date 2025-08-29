"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Brain, Eye, EyeOff, Mail, Lock } from "lucide-react"

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [userType, setUserType] = useState("tutor")
	const navigate = useNavigate()

	const handleSubmit = (e) => {
		e.preventDefault()
		// Mock authentication - in real app, this would call an API
		if (userType === "tutor") {
			navigate("/tutor-dashboard")
		} else {
			navigate("/student-dashboard")
		}
	}

	return (
		<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<Link to="/" className="flex items-center justify-center space-x-2 mb-8">
						<Brain className="h-10 w-10 text-primary-500" />
						<span className="text-2xl font-bold gradient-text">Epistemy</span>
					</Link>
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
								<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
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
								<Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-dark-400" />
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
									className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 hover:text-white"
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

					<div className="mt-6">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-dark-600" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-dark-800 text-dark-400">Or continue with</span>
							</div>
						</div>

						<div className="mt-6 grid grid-cols-2 gap-3">
							<button className="btn-secondary flex items-center justify-center">
								<svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
									<path
										fill="currentColor"
										d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
									/>
									<path
										fill="currentColor"
										d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
									/>
									<path
										fill="currentColor"
										d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
									/>
									<path
										fill="currentColor"
										d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
									/>
								</svg>
								Google
							</button>
							<button className="btn-secondary flex items-center justify-center">
								<svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.024-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.221.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z" />
								</svg>
								GitHub
							</button>
						</div>
					</div>
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
