import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-200/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-200/20 rounded-full blur-3xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          {/* 404 Icon */}
          <div className="mb-6 sm:mb-8">
            <div className="inline-flex p-6 sm:p-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full shadow-soft">
              <ApperIcon name="BookX" className="h-12 w-12 sm:h-16 sm:w-16 text-white" />
            </div>
          </div>

          {/* 404 Text */}
          <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold bg-gradient-to-r from-primary-500 to-secondary-500 bg-clip-text text-transparent mb-4 sm:mb-6">
            404
          </h1>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6">
            Page Not Found
          </h2>
          
          <p className="text-base sm:text-lg lg:text-xl text-surface-600 dark:text-surface-300 mb-8 sm:mb-12 leading-relaxed px-4">
            The page you're looking for seems to have wandered off into the digital library. Let's get you back on track to continue your reading journey.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/"
              className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-secondary-600 transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 w-full sm:w-auto justify-center"
            >
              <ApperIcon name="Home" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Back to Home
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="group inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm border border-surface-200 dark:border-surface-700 text-surface-700 dark:text-surface-200 font-semibold rounded-xl hover:bg-white dark:hover:bg-surface-700 transition-all duration-300 shadow-soft hover:shadow-card hover:scale-105 w-full sm:w-auto justify-center"
            >
              <ApperIcon name="ArrowLeft" className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Go Back
            </button>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 sm:mt-16 p-6 sm:p-8 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50">
            <h3 className="text-lg sm:text-xl font-semibold text-surface-900 dark:text-white mb-4">
              Popular Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {[
                { icon: "MessageSquare", label: "AI Chat" },
                { icon: "Upload", label: "Upload Text" },
                { icon: "BarChart3", label: "Progress Tracking" }
              ].map((feature, index) => (
                <Link
                  key={index}
                  to="/"
                  className="group p-4 rounded-xl hover:bg-primary-50 dark:hover:bg-surface-700/50 transition-all duration-200"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <ApperIcon 
                      name={feature.icon} 
                      className="h-6 w-6 text-primary-500 group-hover:scale-110 transition-transform duration-200" 
                    />
                    <span className="text-sm font-medium text-surface-700 dark:text-surface-300">
                      {feature.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}