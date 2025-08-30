"use client"

import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Brain, Menu, X } from "lucide-react"
import { getUser } from "../auth"

const Navbar = ({ transparent = false }) => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [user, setUser] = React.useState(() => getUser())
  const location = useLocation()

  React.useEffect(() => {
    setUser(getUser())
  }, [location])

	const dashPath = user?.role === 'tutor' ? '/tutor-dashboard' : user?.role === 'student' ? '/student-dashboard' : '/'

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-50 ${transparent ? "bg-transparent" : "bg-dark-900/95 backdrop-blur-sm"} border-b border-dark-700`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<Link to="/" className="flex items-center space-x-2">
						<Brain className="h-8 w-8 text-primary-500" />
						<span className="text-xl font-bold gradient-text">Epistemy</span>
					</Link>

					{/* Desktop Navigation */}
								<div className="hidden md:flex items-center space-x-8">
						<Link to="/" className="text-dark-300 hover:text-white transition-colors">
							Home
						</Link>
						<Link to="/features" className="text-dark-300 hover:text-white transition-colors">
							Features
						</Link>
						
									{user ? (
										<Link to={dashPath} className="btn-secondary">Go to Dashboard</Link>
									) : (
							<>
								<Link to="/login" className="text-dark-300 hover:text-white transition-colors">
									Login
								</Link>
								<Link to="/signup" className="btn-primary">
									Get Started
								</Link>
							</>
						)}
					</div>

					{/* Mobile menu button */}
					<div className="md:hidden">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-dark-300 hover:text-white">
							{isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
						</button>
					</div>
				</div>

				{/* Mobile Navigation */}
				{isMenuOpen && (
					<div className="md:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1 bg-dark-800 rounded-lg mt-2">
							<Link to="/" className="block px-3 py-2 text-dark-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
								Home
							</Link>
							<Link to="/features" className="block px-3 py-2 text-dark-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
								Features
							</Link>
							<Link to="/pricing" className="block px-3 py-2 text-dark-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
								Pricing
							</Link>
											{user ? (
												<Link to={dashPath} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-primary-500 hover:text-primary-400">Go to Dashboard</Link>
											) : (
								<>
									<Link to="/login" className="block px-3 py-2 text-dark-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>
										Login
									</Link>
									<Link to="/signup" className="block px-3 py-2 text-primary-500 hover:text-primary-400" onClick={() => setIsMenuOpen(false)}>
										Get Started
									</Link>
								</>
							)}
						</div>
					</div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
