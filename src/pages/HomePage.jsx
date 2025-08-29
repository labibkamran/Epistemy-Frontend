import { Link } from "react-router-dom"
import { Play, BookOpen, Users, TrendingUp, CheckCircle, Star, ArrowRight, Brain } from "lucide-react"

const HomePage = () => {
	return (
		<div className="min-h-screen bg-dark-900">

			{/* Hero Section */}
			<section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto text-center">
					<h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
						Turn Your <span className="gradient-text">Tutoring</span> Into a Product
					</h1>
					<p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto text-pretty">
						Transform your tutoring sessions into intelligent learning experiences with AI-powered insights, automated
						content generation, and seamless student engagement.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/signup" className="btn-primary text-lg px-8 py-4">
							Try Epistemy Now
						</Link>
						<button className="btn-secondary text-lg px-8 py-4 flex items-center justify-center gap-2">
							<Play className="h-5 w-5" />
							Watch Demo
						</button>
					</div>
				</div>
			</section>

			{/* How It Works */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="text-center">
							<div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<BookOpen className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-4">1. Book & Teach Normally</h3>
							<p className="text-dark-300">
								Continue your regular tutoring sessions. Our platform captures and analyzes every interaction.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<TrendingUp className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-4">2. AI Packages Your Content</h3>
							<p className="text-dark-300">
								Our AI automatically generates summaries, quizzes, and personalized feedback from your sessions.
							</p>
						</div>
						<div className="text-center">
							<div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
								<Users className="h-8 w-8 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-4">3. Sell Without Complexity</h3>
							<p className="text-dark-300">
								Students access their personalized learning materials through a beautiful, organized dashboard.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* What You Get */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-16">What You Get</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="card">
							<div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
								<BookOpen className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Create Once, Sell Repeatedly</h3>
							<p className="text-dark-300">
								Transform your tutoring sessions into reusable learning products that generate passive income.
							</p>
						</div>
						<div className="card">
							<div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
								<TrendingUp className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Go From 1-on-1 to 1-to-Many</h3>
							<p className="text-dark-300">
								Scale your expertise beyond individual sessions to reach hundreds of students simultaneously.
							</p>
						</div>
						<div className="card">
							<div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
								<Users className="h-6 w-6 text-white" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Complete Storefront Solution</h3>
							<p className="text-dark-300">
								Get a professional landing page, payment processing, and student management all in one platform.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Features */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid lg:grid-cols-2 gap-12 items-center">
						<div>
							<h2 className="text-4xl font-bold mb-6">AI-Powered Session Intelligence</h2>
							<div className="space-y-4">
								<div className="flex items-start gap-3">
									<CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-1">Smart Topic Extraction</h3>
										<p className="text-dark-300">
											Automatically identify key subjects and learning objectives from your sessions.
										</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-1">Progress Tracking</h3>
										<p className="text-dark-300">Monitor student advancement and identify areas needing attention.</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-1">Adaptive Quiz Generation</h3>
										<p className="text-dark-300">Create personalized practice questions based on session content.</p>
									</div>
								</div>
								<div className="flex items-start gap-3">
									<CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
									<div>
										<h3 className="font-semibold mb-1">Detailed Feedback Reports</h3>
										<p className="text-dark-300">Generate comprehensive insights for both tutors and students.</p>
									</div>
								</div>
							</div>
						</div>
						<div className="glass-effect rounded-2xl p-8">
							<div className="bg-dark-700 rounded-lg p-4 mb-4">
								<div className="flex items-center gap-2 mb-2">
									<div className="w-3 h-3 bg-red-500 rounded-full"></div>
									<div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
									<div className="w-3 h-3 bg-green-500 rounded-full"></div>
								</div>
								<div className="text-sm text-dark-300">Session Analysis Complete</div>
							</div>
							<div className="space-y-3">
								<div className="bg-primary-600/20 border border-primary-600/30 rounded-lg p-3">
									<div className="text-sm font-medium text-primary-400">Topics Covered</div>
									<div className="text-xs text-dark-300">Calculus, Derivatives, Chain Rule</div>
								</div>
								<div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
									<div className="text-sm font-medium text-green-400">Progress Score</div>
									<div className="text-xs text-dark-300">85% improvement from last session</div>
								</div>
								<div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
									<div className="text-sm font-medium text-yellow-400">Generated Quiz</div>
									<div className="text-xs text-dark-300">5 questions ready for student practice</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Testimonials */}
			<section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
				<div className="max-w-7xl mx-auto">
					<h2 className="text-4xl font-bold text-center mb-16">What Tutors Are Saying</h2>
					<div className="grid md:grid-cols-3 gap-8">
						<div className="card">
							<div className="flex items-center gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
								))}
							</div>
							<p className="text-dark-300 mb-4">
								"Epistemy transformed my tutoring business. I now earn 3x more while helping more students than ever
								before."
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold">SM</span>
								</div>
								<div>
									<div className="font-semibold">Sarah Mitchell</div>
									<div className="text-sm text-dark-400">Math Tutor</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="flex items-center gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
								))}
							</div>
							<p className="text-dark-300 mb-4">
								"The AI insights help me understand my students better and create more effective lesson plans."
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold">JD</span>
								</div>
								<div>
									<div className="font-semibold">James Davis</div>
									<div className="text-sm text-dark-400">Physics Tutor</div>
								</div>
							</div>
						</div>
						<div className="card">
							<div className="flex items-center gap-1 mb-4">
								{[...Array(5)].map((_, i) => (
									<Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
								))}
							</div>
							<p className="text-dark-300 mb-4">
								"My students love the personalized quizzes and progress tracking. Engagement has never been higher."
							</p>
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
									<span className="text-sm font-semibold">ER</span>
								</div>
								<div>
									<div className="font-semibold">Emily Rodriguez</div>
									<div className="text-sm text-dark-400">Language Tutor</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-20 px-4 sm:px-6 lg:px-8">
				<div className="max-w-4xl mx-auto text-center">
					<h2 className="text-4xl font-bold mb-6">Ready to Transform Your Tutoring Business?</h2>
					<p className="text-xl text-dark-300 mb-8">
						Join thousands of tutors who are already scaling their expertise with Epistemy's AI-powered platform.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Link to="/signup" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
							Start Free Trial
							<ArrowRight className="h-5 w-5" />
						</Link>
						<Link to="/login" className="btn-secondary text-lg px-8 py-4">
							Sign In to Dashboard
						</Link>
					</div>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-dark-800 border-t border-dark-700 py-12 px-4 sm:px-6 lg:px-8">
				<div className="max-w-7xl mx-auto">
					<div className="grid md:grid-cols-4 gap-8">
						<div>
							<div className="flex items-center space-x-2 mb-4">
								<Brain className="h-8 w-8 text-primary-500" />
								<span className="text-xl font-bold gradient-text">Epistemy</span>
							</div>
							<p className="text-dark-400">
								AI-powered coaching platform that transforms tutoring sessions into scalable learning products.
							</p>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Product</h3>
							<ul className="space-y-2 text-dark-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Features
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Pricing
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										API
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Integrations
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Company</h3>
							<ul className="space-y-2 text-dark-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										About
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Blog
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Careers
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Contact
									</a>
								</li>
							</ul>
						</div>
						<div>
							<h3 className="font-semibold mb-4">Support</h3>
							<ul className="space-y-2 text-dark-400">
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Help Center
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Documentation
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Community
									</a>
								</li>
								<li>
									<a href="#" className="hover:text-white transition-colors">
										Status
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div className="border-t border-dark-700 mt-8 pt-8 text-center text-dark-400">
						<p>&copy; 2024 Epistemy. All rights reserved.</p>
					</div>
				</div>
			</footer>
		</div>
	)
}

export default HomePage
