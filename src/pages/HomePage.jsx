import { Link } from "react-router-dom";
import { Play, BookOpen, Users, TrendingUp, CheckCircle, Star, ArrowRight, Brain } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-dark-900">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Transform Your <span className="gradient-text">Learning</span> Journey with AI
          </h1>
          <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto text-pretty">
            Whether you're a tutor looking to scale or a student aiming to learn smarter, our AI-powered platform enhances your educational experience in modern ways.
          </p>
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
              <h3 className="text-xl font-semibold mb-4">1. Book, Teach & Learn</h3>
              <p className="text-dark-300">
                Tutors conduct sessions, while students actively participate in live lessons.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. AI Generates Insights</h3>
              <p className="text-dark-300">
                After each session, AI analyzes the content, providing tutors with progress tracking and students with personalized feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Access and Learn</h3>
              <p className="text-dark-300">
                Students can access their tailored materials, and tutors can easily manage multiple students through an organized dashboard.
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
              <h3 className="text-xl font-semibold mb-3">For Tutors: Scalable Business</h3>
              <p className="text-dark-300">
                Easily scale your tutoring services with the ability to sell reusable learning materials to multiple students.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Students: Personalized Learning</h3>
              <p className="text-dark-300">
                Get customized materials, quizzes, and progress tracking tailored to your individual learning style.
              </p>
            </div>
            <div className="card">
              <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Both: Seamless Experience</h3>
              <p className="text-dark-300">
                An intuitive platform for both tutors and students to interact, learn, and grow together.
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
              <h2 className="text-4xl font-bold mb-6">AI-Powered Insights for Every Session</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Smart Topic Extraction</h3>
                    <p className="text-dark-300">
                      Automatically extract the most important topics from your tutoring sessions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Progress Tracking</h3>
                    <p className="text-dark-300">For students: Keep track of your progress, for tutors: View detailed student metrics.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Adaptive Quiz Generation</h3>
                    <p className="text-dark-300">Personalized quizzes based on the content covered during your sessions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-1">Instant Feedback</h3>
                    <p className="text-dark-300">Receive real-time feedback on your sessions, with detailed reports on strengths and areas for improvement.</p>
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
          <h2 className="text-4xl font-bold text-center mb-16">What Tutors & Students Are Saying</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-dark-300 mb-4">
                "Epistemy transformed my tutoring business. I now earn 3x more while helping more students than ever before."
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
                "I love how personalized my learning materials are. I'm finally able to track my progress in a meaningful way."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">JD</span>
                </div>
                <div>
                  <div className="font-semibold">James Davis</div>
                  <div className="text-sm text-dark-400">Student</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Learning Experience?</h2>
          <p className="text-xl text-dark-300 mb-8">
            Whether you're a tutor or a student, Epistemy is here to revolutionize your learning journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Start your journey
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
                AI-powered learning platform transforming education for both tutors and students.
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
  );
}

export default HomePage;
