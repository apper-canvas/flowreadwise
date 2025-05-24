import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200/30 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-secondary-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-2xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center space-x-2 sm:space-x-3"
            >
              <div className="p-2 sm:p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl shadow-soft">
                <ApperIcon name="BookOpen" className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  ReadWise
                </h1>
                <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400 hidden sm:block">
                  AI-Powered Reading Companion
                </p>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={toggleDarkMode}
              className="p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm border border-surface-200 dark:border-surface-700 hover:scale-105 transition-all duration-200 shadow-soft"
            >
              <ApperIcon 
                name={darkMode ? "Sun" : "Moon"} 
                className="h-5 w-5 sm:h-6 sm:w-6 text-surface-700 dark:text-surface-300" 
              />
            </motion.button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold text-surface-900 dark:text-white mb-4 sm:mb-6 text-shadow"
          >
            Transform Your
            <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent bg-clip-text text-transparent">
              Reading Experience
            </span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg lg:text-xl xl:text-2xl text-surface-600 dark:text-surface-300 max-w-2xl lg:max-w-4xl mx-auto leading-relaxed px-4"
          >
            Unlock deeper comprehension with AI-powered insights, personalized questions, and interactive discussions tailored to your reading level.
          </motion.p>
        </div>

        {/* Stats Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 lg:mb-20"
        >
          {[
            { icon: "Brain", label: "AI Analysis", value: "Smart Insights" },
            { icon: "Target", label: "Comprehension", value: "98% Better" },
            { icon: "TrendingUp", label: "Progress", value: "Real-time" }
          ].map((stat, index) => (
            <div 
              key={index}
              className="group p-4 sm:p-6 lg:p-8 bg-white/60 dark:bg-surface-800/60 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 hover:bg-white/80 dark:hover:bg-surface-800/80 transition-all duration-300 shadow-soft hover:shadow-card"
            >
              <div className="flex flex-col items-center text-center space-y-2 sm:space-y-3">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl group-hover:scale-110 transition-transform duration-300">
                  <ApperIcon name={stat.icon} className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <div>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-surface-900 dark:text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Main Feature */}
      <MainFeature />

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center">
          <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400">
            © 2024 ReadWise. Empowering readers with AI-driven insights.
          </p>
        </div>
      </footer>
    </div>
  )
}