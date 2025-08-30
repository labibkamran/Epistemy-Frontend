"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Brain, Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import { tutorSignup } from "../api/tutor"
import { studentSignup } from "../api/student"
import { setUser } from "../auth"

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		userType: "tutor",
		agreeToTerms: false,
	})
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
				if (formData.userType === "tutor") {
						try {
							const { user } = await tutorSignup({
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.email,
						password: formData.password,
					})
							setUser(user)
					navigate("/tutor-dashboard")
				} catch (err) {
					alert(err.message || "Sign up failed")
				}
				return
			}
				// Student flow (real API)
				if (formData.password !== formData.confirmPassword) {
					alert("Passwords do not match")
					return
				}
					try {
						const { user } = await studentSignup({
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.email,
						password: formData.password,
					})
						setUser(user)
					navigate("/student-dashboard")
				} catch (err) {
					alert(err.message || "Sign up failed")
				}
	}

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormData((prev) => ({
			...prev,
			[name]: type === "checkbox" ? checked : value,
		}))
	}

	return (
		<div className="min-h-screen bg-dark-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
			<div className="max-w-md w-full space-y-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold">Create your account</h2>
					<p className="mt-2 text-dark-300">Join thousands of tutors and students</p>
				</div>

				<div className="card">
					{/* User Type Toggle */}
					<div className="flex bg-dark-700 rounded-lg p-1 mb-6">
						<button
							type="button"
							onClick={() => setFormData((prev) => ({ ...prev, userType: "tutor" }))}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								formData.userType === "tutor" ? "bg-primary-600 text-white" : "text-dark-300 hover:text-white"
							}`}
						>
							I'm a Tutor
						</button>
						<button
							type="button"
							onClick={() => setFormData((prev) => ({ ...prev, userType: "student" }))}
							className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
								formData.userType === "student" ? "bg-primary-600 text-white" : "text-dark-300 hover:text-white"
							}`}
						>
							I'm a Student
						</button>
					</div>

					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<label htmlFor="firstName" className="block text-sm font-medium text-dark-200 mb-2">
									First name
								</label>
				    <div className="relative">
					    <span className="input-icon"><User className="h-5 w-5 text-dark-400" /></span>
									<input
										id="firstName"
										name="firstName"
										type="text"
										required
										value={formData.firstName}
										onChange={handleInputChange}
										className="input-field pl-10"
										placeholder="John"
									/>
								</div>
							</div>
							<div>
								<label htmlFor="lastName" className="block text-sm font-medium text-dark-200 mb-2">
									Last name
								</label>
								<input
									id="lastName"
									name="lastName"
									type="text"
									required
									value={formData.lastName}
									onChange={handleInputChange}
									className="input-field"
									placeholder="Doe"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="email" className="block text-sm font-medium text-dark-200 mb-2">
								Email address
							</label>
							<div className="relative">
								<span className="input-icon"><Mail className="h-5 w-5 text-dark-400" /></span>
								<input
									id="email"
									name="email"
									type="email"
									required
									value={formData.email}
									onChange={handleInputChange}
									className="input-field pl-10"
									placeholder="john@example.com"
								/>
							</div>
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium text-dark-200 mb-2">
								Password
							</label>
							<div className="relative">
								<span className="input-icon"><Lock className="h-5 w-5 text-dark-400" /></span>
								<input
									id="password"
									name="password"
									type={showPassword ? "text" : "password"}
									required
									value={formData.password}
									onChange={handleInputChange}
									className="input-field pl-10 pr-10"
									placeholder="Create a strong password"
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

						<div>
							<label htmlFor="confirmPassword" className="block text-sm font-medium text-dark-200 mb-2">
								Confirm password
							</label>
							<div className="relative">
								<span className="input-icon"><Lock className="h-5 w-5 text-dark-400" /></span>
								<input
									id="confirmPassword"
									name="confirmPassword"
									type={showConfirmPassword ? "text" : "password"}
									required
									value={formData.confirmPassword}
									onChange={handleInputChange}
									className="input-field pl-10 pr-10"
									placeholder="Confirm your password"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="input-action text-dark-400 hover:text-white"
								>
									{showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
								</button>
							</div>
						</div>

						<div className="flex items-center">
							<input
								id="agreeToTerms"
								name="agreeToTerms"
								type="checkbox"
								required
								checked={formData.agreeToTerms}
								onChange={handleInputChange}
								className="h-4 w-4 text-primary-600 bg-dark-700 border-dark-600 rounded focus:ring-primary-500"
							/>
							<label htmlFor="agreeToTerms" className="ml-2 block text-sm text-dark-300">
								I agree to the{" "}
								<Link to="/terms" className="text-primary-500 hover:text-primary-400">
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link to="/privacy" className="text-primary-500 hover:text-primary-400">
									Privacy Policy
								</Link>
							</label>
						</div>

						<button type="submit" className="w-full btn-primary">
							Create account
						</button>
					</form>
				</div>

				<p className="text-center text-dark-400">
					Already have an account?{" "}
					<Link to="/login" className="text-primary-500 hover:text-primary-400 font-medium">
						Login
					</Link>
				</p>
			</div>
		</div>
	)
}

export default SignUpPage
