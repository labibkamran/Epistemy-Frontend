import { Link } from "react-router-dom";
import { Play, BookOpen, TrendingUp, CheckCircle, Star, ArrowRight, Users, Brain } from "lucide-react";

const FeaturesPage = () => {
  return (
    <div className="min-h-screen bg-dark-900">

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
            Unlock the Power of AI for Smarter Learning
          </h1>
          <p className="text-xl md:text-2xl text-dark-300 mb-8 max-w-3xl mx-auto text-pretty">
            Explore the groundbreaking features that make learning more efficient, personalized, and scalable for both tutors and students.
          </p>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Powered Content Generation</h3>
              <p className="text-dark-300">
                Automatically generate quizzes, summaries, and personalized learning materials based on your tutoring sessions.
              </p>
            </div>
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Progress Tracking</h3>
              <p className="text-dark-300">
                Track your student’s learning progress with detailed analytics and performance reports in real time.
              </p>
            </div>
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Feedback & Reports</h3>
              <p className="text-dark-300">
                Generate instant, actionable feedback for both tutors and students, improving learning outcomes.
              </p>
            </div>
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Manage Multiple Students</h3>
              <p className="text-dark-300">
                Tutors can manage multiple students, each with personalized materials, all from a unified dashboard.
              </p>
            </div>
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI-Driven Session Insights</h3>
              <p className="text-dark-300">
                Get detailed session analytics that highlight key learning points, student challenges, and areas for improvement.
              </p>
            </div>
            <div className="text-center card">
              <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Play className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Interactive Learning Tools</h3>
              <p className="text-dark-300">
                Engage students with interactive content like quizzes, challenges, and progress tracking within sessions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Benefits */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">The Power of AI for Your Learning Journey</h2>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Personalized Learning at Scale</h3>
              <p className="text-dark-300 mb-6">
                Whether you are a tutor managing multiple students or a student focused on improving your skills, our platform tailors content to your needs using AI.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Automated Content Creation</h3>
              <p className="text-dark-300 mb-6">
                Save time with automated content generation. From quizzes to progress reports, AI helps you focus more on teaching and learning.
              </p>
              <h3 className="text-2xl font-semibold mb-4">Effortless Progress Tracking</h3>
              <p className="text-dark-300">
                Get automatic insights into learning progress with AI-powered tracking, helping you improve your skills or teaching methods.
              </p>
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
                  <div className="text-xs text-dark-300">Algebra, Functions, Derivatives</div>
                </div>
                <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-green-400">Progress Score</div>
                  <div className="text-xs text-dark-300">90% improvement from last session</div>
                </div>
                <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
                  <div className="text-sm font-medium text-yellow-400">Generated Quiz</div>
                  <div className="text-xs text-dark-300">6 questions ready for student practice</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
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
};

export default FeaturesPage;
