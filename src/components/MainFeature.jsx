import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'

export default function MainFeature() {
  const [activeTab, setActiveTab] = useState('upload')
  const [uploadedText, setUploadedText] = useState('')
  const [analysisResult, setAnalysisResult] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [readingLevel, setReadingLevel] = useState('intermediate')
  const [highlights, setHighlights] = useState([])
  const [selectedText, setSelectedText] = useState('')
  const [selectionRange, setSelectionRange] = useState(null)
  const [showHighlightToolbar, setShowHighlightToolbar] = useState(false)
  const [highlightNote, setHighlightNote] = useState('')
  const [highlightColor, setHighlightColor] = useState('yellow')
  const [searchQuery, setSearchQuery] = useState('')
  const [readingText, setReadingText] = useState('')
  const [editingHighlight, setEditingHighlight] = useState(null)
  const [sampleTexts] = useState([
    { title: "The Science of Learning", content: "Learning is a complex process that involves the formation of new neural pathways in the brain. When we encounter new information, our neurons create connections that allow us to store and retrieve memories. This process, known as neuroplasticity, demonstrates the brain's remarkable ability to adapt and reorganize throughout our lives. Research has shown that active engagement with material, spaced repetition, and connecting new information to existing knowledge significantly enhance learning outcomes." },
    { title: "Climate Change Impact", content: "Climate change represents one of the most pressing challenges of our time. Rising global temperatures have led to melting ice caps, rising sea levels, and increasingly frequent extreme weather events. Scientists have observed that carbon dioxide levels in the atmosphere have increased by over 40% since pre-industrial times, primarily due to human activities such as burning fossil fuels and deforestation. The consequences of these changes affect ecosystems, agriculture, and human communities worldwide." },
    { title: "Artificial Intelligence", content: "Artificial intelligence has evolved from science fiction to everyday reality. Modern AI systems can process vast amounts of data, recognize patterns, and make decisions with remarkable accuracy. Machine learning algorithms enable computers to improve their performance through experience, while neural networks mimic the structure of the human brain to solve complex problems. From virtual assistants to autonomous vehicles, AI technology continues to transform how we work, communicate, and live." }
  ])
  const fileInputRef = useRef(null)
  const readingAreaRef = useRef(null)

  const tabs = [
    { id: 'upload', label: 'Text Analysis', icon: 'FileText' },
    { id: 'chat', label: 'AI Assistant', icon: 'MessageSquare' },
    { id: 'progress', label: 'Progress', icon: 'BarChart3' },
    { id: 'highlight', label: 'Highlight & Note', icon: 'Highlighter' }
  ]

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.type === 'text/plain') {
        const reader = new FileReader()
        reader.onload = (e) => {
          setUploadedText(e.target.result)
          toast.success('File uploaded successfully!')
        }
        reader.readAsText(file)
      } else {
        toast.error('Please upload a text file (.txt)')
      }
    }
  }

  const handleTextAnalysis = () => {
    if (!uploadedText.trim()) {
      toast.error('Please enter or upload some text to analyze')
      return
    }

    setIsAnalyzing(true)
    
    // Simulate AI analysis
    setTimeout(() => {
      const wordCount = uploadedText.trim().split(/\s+/).length
      const sentences = uploadedText.split(/[.!?]+/).filter(s => s.trim().length > 0).length
      const avgWordsPerSentence = Math.round(wordCount / sentences)
      
      let difficulty = 'Beginner'
      if (avgWordsPerSentence > 15) difficulty = 'Intermediate'
      if (avgWordsPerSentence > 25) difficulty = 'Advanced'

      const analysis = {
        wordCount,
        sentences,
        avgWordsPerSentence,
        difficulty,
        readingTime: Math.ceil(wordCount / 200),
        keyTopics: ['Main Theme', 'Supporting Ideas', 'Conclusion'],
        comprehensionQuestions: [
          "What is the main idea of this text?",
          "What evidence supports the author's argument?",
          "How does this relate to the broader topic?"
        ]
      }

      setAnalysisResult(analysis)
      setIsAnalyzing(false)
      toast.success('Analysis complete!')
    }, 2000)
  }

  const handleSendMessage = () => {
    if (!chatInput.trim()) return

    const userMessage = { type: 'user', content: chatInput, timestamp: new Date() }
    setChatMessages(prev => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Based on the text you've shared, I can help you understand the key concepts better.",
        "Great observation! Let me break down that concept for you in simpler terms.",
        "I notice you're focusing on an important detail. Here's how it connects to the main theme...",
        "Excellent question! This relates to reading comprehension strategies. Let me explain..."
      ]
      
      const aiMessage = {
        type: 'ai',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }
      
      setChatMessages(prev => [...prev, aiMessage])
    }, 1000)

    setChatInput('')
  }

  const progressData = [
    { label: 'Texts Analyzed', value: 23, icon: 'FileText', color: 'primary' },
    { label: 'Comprehension Score', value: '94%', icon: 'Target', color: 'secondary' },
    { label: 'Reading Streak', value: '7 days', icon: 'Flame', color: 'accent' },
    { label: 'Words Read', value: '12.5K', icon: 'BookOpen', color: 'primary' }
  ]

  const handleTextSelection = () => {
    const selection = window.getSelection()
    if (selection.rangeCount > 0 && selection.toString().trim()) {
      const range = selection.getRangeAt(0)
      const rect = range.getBoundingClientRect()
      
      setSelectedText(selection.toString().trim())
      setSelectionRange(range.cloneRange())
      setShowHighlightToolbar(true)
    } else {
      setShowHighlightToolbar(false)
      setSelectedText('')
      setSelectionRange(null)
    }
  }

  const handleCreateHighlight = () => {
    if (!selectedText || !selectionRange) return

    const highlight = {
      id: Date.now(),
      text: selectedText,
      note: highlightNote,
      color: highlightColor,
      timestamp: new Date(),
      startOffset: selectionRange.startOffset,
      endOffset: selectionRange.endOffset,
      startContainer: selectionRange.startContainer.textContent,
      endContainer: selectionRange.endContainer.textContent
    }

    setHighlights(prev => [...prev, highlight])
    setHighlightNote('')
    setShowHighlightToolbar(false)
    setSelectedText('')
    setSelectionRange(null)
    
    // Clear selection
    window.getSelection().removeAllRanges()
    
    toast.success('Highlight created successfully!')
  }

  const handleDeleteHighlight = (id) => {
    setHighlights(prev => prev.filter(h => h.id !== id))
    toast.success('Highlight deleted successfully!')
  }

  const handleEditHighlight = (id, newNote) => {
    setHighlights(prev => prev.map(h => 
      h.id === id ? { ...h, note: newNote } : h
    ))
    setEditingHighlight(null)
    toast.success('Note updated successfully!')
  }

  const handleLoadSampleText = (text) => {
    setReadingText(text)
    toast.success('Sample text loaded!')
  }

  const filteredHighlights = highlights.filter(highlight =>
    highlight.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    highlight.note.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const renderHighlightedText = (text) => {
    if (!text || highlights.length === 0) return text

    let result = text
    const sortedHighlights = [...highlights].sort((a, b) => b.startOffset - a.startOffset)

    sortedHighlights.forEach(highlight => {
      const regex = new RegExp(highlight.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi')
      result = result.replace(regex, (match) => 
        `<mark class="highlight-${highlight.color} cursor-pointer" data-highlight-id="${highlight.id}" title="${highlight.note || 'No note'}">${match}</mark>`
      )
    })

    return result
  }

  const highlightColors = [
    { name: 'yellow', bg: 'bg-yellow-200', border: 'border-yellow-400' },
    { name: 'green', bg: 'bg-green-200', border: 'border-green-400' },
    { name: 'blue', bg: 'bg-blue-200', border: 'border-blue-400' },
    { name: 'pink', bg: 'bg-pink-200', border: 'border-pink-400' }
  ]

  // Add CSS for highlight colors
  const highlightStyles = `
    .highlight-yellow { background-color: #fef08a; }
    .highlight-green { background-color: #bbf7d0; }
    .highlight-blue { background-color: #bfdbfe; }
    .highlight-pink { background-color: #fbcfe8; }
    .highlight-yellow:hover { background-color: #fde047; }
    .highlight-green:hover { background-color: #86efac; }
    .highlight-blue:hover { background-color: #93c5fd; }
    .highlight-pink:hover { background-color: #f9a8d4; }
  `

  return (
    <>
      <style>{highlightStyles}</style>
    <section className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        {/* Feature Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-surface-900 dark:text-white mb-4">
            Your Personal Reading Assistant
          </h3>
          <p className="text-base sm:text-lg text-surface-600 dark:text-surface-300 max-w-2xl mx-auto">
            Upload text, get AI-powered insights, and track your comprehension progress
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col sm:flex-row bg-white/80 dark:bg-surface-800/80 backdrop-blur-sm rounded-2xl p-2 mb-8 shadow-soft border border-surface-200/50 dark:border-surface-700/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 mb-2 sm:mb-0 ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-black shadow-soft font-bold'
                  : 'text-surface-700 dark:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-700/50 hover:text-surface-900 dark:hover:text-surface-100'
              }`}
            >
              <ApperIcon 
                name={tab.icon} 
                className={`h-5 w-5 mr-2 sm:mr-3 ${activeTab === tab.id ? 'text-black' : ''}`} 
              />
              <span className="text-sm sm:text-base font-inherit">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white/70 dark:bg-surface-800/70 backdrop-blur-sm rounded-2xl border border-surface-200/50 dark:border-surface-700/50 shadow-soft"
          >
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Text Input */}
                  <div className="space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-sm sm:text-base font-semibold text-surface-700 dark:text-surface-200 mb-3">
                        Enter or Upload Text
                      </label>
                      
                      {/* Reading Level Selector */}
                      <div className="mb-4">
                        <label className="block text-xs sm:text-sm text-surface-600 dark:text-surface-400 mb-2">
                          Your Reading Level
                        </label>
                        <select
                          value={readingLevel}
                          onChange={(e) => setReadingLevel(e.target.value)}
                          className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                        >
                          <option value="beginner">Beginner</option>
                          <option value="intermediate">Intermediate</option>
                          <option value="advanced">Advanced</option>
                        </select>
                      </div>

                      <textarea
                        value={uploadedText}
                        onChange={(e) => setUploadedText(e.target.value)}
                        placeholder="Paste your text here or upload a file below..."
                        className="w-full h-40 sm:h-48 lg:h-56 px-4 sm:px-5 py-3 sm:py-4 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm sm:text-base reading-focus highlight-selection"
                      />
                    </div>

                    {/* File Upload */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".txt"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex-1 flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-surface-100 dark:bg-surface-600 text-surface-700 dark:text-surface-200 rounded-xl hover:bg-surface-200 dark:hover:bg-surface-500 transition-all duration-200 border-2 border-dashed border-surface-300 dark:border-surface-500 hover:border-primary-400 text-sm sm:text-base"
                      >
                        <ApperIcon name="Upload" className="h-5 w-5 mr-2" />
                        Upload File
                      </button>
                      
                      <button
                        onClick={handleTextAnalysis}
                        disabled={isAnalyzing || !uploadedText.trim()}
                        className="flex-1 flex items-center justify-center px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft hover:shadow-card text-sm sm:text-base"
                      >
                        {isAnalyzing ? (
                          <>
                            <ApperIcon name="Loader2" className="h-5 w-5 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <ApperIcon name="Brain" className="h-5 w-5 mr-2" />
                            Analyze Text
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Analysis Results */}
                  <div className="space-y-4 sm:space-y-6">
                    {analysisResult ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4 sm:space-y-6"
                      >
                        <h4 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-surface-100">
                          Analysis Results
                        </h4>
                        
                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                          {[
                            { label: 'Words', value: analysisResult.wordCount, icon: 'Type' },
                            { label: 'Reading Time', value: `${analysisResult.readingTime}m`, icon: 'Clock' },
                            { label: 'Difficulty', value: analysisResult.difficulty, icon: 'TrendingUp' },
                            { label: 'Sentences', value: analysisResult.sentences, icon: 'List' }
                          ].map((stat, index) => (
                            <div key={index} className="p-3 sm:p-4 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-surface-700 dark:to-surface-600 rounded-xl border border-surface-200 dark:border-surface-500">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <ApperIcon name={stat.icon} className="h-4 w-4 sm:h-5 sm:w-5 text-primary-600 dark:text-primary-400" />
                                <div>
                                  <p className="text-lg sm:text-xl font-bold text-surface-800 dark:text-surface-100">
                                    {stat.value}
                                  </p>
                                  <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">
                                    {stat.label}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Comprehension Questions */}
                        <div className="p-4 sm:p-6 bg-accent/10 dark:bg-accent/20 rounded-xl border border-accent/30">
                          <h5 className="font-semibold text-surface-800 dark:text-surface-100 mb-3 sm:mb-4 flex items-center">
                            <ApperIcon name="HelpCircle" className="h-5 w-5 mr-2 text-accent" />
                            Comprehension Questions
                          </h5>
                          <ul className="space-y-2 sm:space-y-3">
                            {analysisResult.comprehensionQuestions.map((question, index) => (
                              <li key={index} className="flex items-start space-x-2 sm:space-x-3 text-sm sm:text-base text-surface-700 dark:text-surface-300">
                                <span className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-medium mt-0.5">
                                  {index + 1}
                                </span>
                                <span>{question}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-48 sm:h-64 lg:h-80 text-center">
                        <div className="p-4 sm:p-6 bg-surface-100 dark:bg-surface-700 rounded-full mb-4 sm:mb-6">
                          <ApperIcon name="FileSearch" className="h-8 w-8 sm:h-12 sm:w-12 text-surface-400" />
                        </div>
                        <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 max-w-xs">
                          Upload or paste text to get AI-powered analysis and insights
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Chat Tab */}
            {activeTab === 'chat' && (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="flex flex-col h-96 sm:h-[500px] lg:h-[600px]">
                  {/* Chat Header */}
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6 pb-4 border-b border-surface-200 dark:border-surface-600">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl">
                      <ApperIcon name="Bot" className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-surface-800 dark:text-surface-100 text-sm sm:text-base">
                        AI Reading Assistant
                      </h4>
                      <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400">
                        Ask questions about your reading material
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 sm:space-y-4 mb-4 sm:mb-6 scrollbar-hide">
                    {chatMessages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="p-4 sm:p-6 bg-surface-100 dark:bg-surface-700 rounded-full mb-4">
                          <ApperIcon name="MessageCircle" className="h-8 w-8 sm:h-10 sm:w-10 text-surface-400" />
                        </div>
                        <p className="text-sm sm:text-base text-surface-500 dark:text-surface-400 max-w-xs">
                          Start a conversation! Ask me about reading strategies, comprehension, or any text analysis.
                        </p>
                      </div>
                    ) : (
                      chatMessages.map((message, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-xs sm:max-w-sm lg:max-w-md px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-sm sm:text-base ${
                            message.type === 'user'
                              ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                              : 'bg-surface-100 dark:bg-surface-700 text-surface-800 dark:text-surface-200'
                          }`}>
                            {message.content}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Chat Input */}
                  <div className="flex space-x-2 sm:space-x-4">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about reading comprehension, text analysis..."
                      className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!chatInput.trim()}
                      className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-xl hover:from-primary-600 hover:to-secondary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-soft"
                    >
                      <ApperIcon name="Send" className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="space-y-6 sm:space-y-8">
                  <div className="text-center">
                    <h4 className="text-xl sm:text-2xl font-bold text-surface-800 dark:text-surface-100 mb-2">
                      Your Reading Progress
                    </h4>
                    <p className="text-sm sm:text-base text-surface-600 dark:text-surface-400">
                      Track your comprehension improvements over time
                    </p>
                  </div>

                  {/* Progress Stats */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {progressData.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="p-4 sm:p-6 bg-gradient-to-br from-white to-surface-50 dark:from-surface-700 dark:to-surface-800 rounded-xl border border-surface-200 dark:border-surface-600 shadow-soft hover:shadow-card transition-all duration-300"
                      >
                        <div className="flex items-center space-x-3 sm:space-x-4">
                          <div className={`p-2 sm:p-3 bg-gradient-to-br ${
                            item.color === 'primary' ? 'from-primary-500 to-primary-600' :
                            item.color === 'secondary' ? 'from-secondary-500 to-secondary-600' :
                            'from-accent to-orange-500'
                          } rounded-xl`}>
                            <ApperIcon name={item.icon} className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                          <div>
                            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-surface-800 dark:text-surface-100">
                              {item.value}
                            </p>
                            <p className="text-xs sm:text-sm text-surface-600 dark:text-surface-400">
                              {item.label}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-gradient-to-br from-surface-50 to-surface-100 dark:from-surface-800 dark:to-surface-700 rounded-xl p-4 sm:p-6 border border-surface-200 dark:border-surface-600">
                    <h5 className="font-semibold text-surface-800 dark:text-surface-100 mb-4 flex items-center text-sm sm:text-base">
                      <ApperIcon name="Activity" className="h-5 w-5 mr-2 text-primary-500" />
                      Recent Reading Sessions
                    </h5>
                    <div className="space-y-3">
                      {[
                        { title: "Scientific Article Analysis", score: 92, time: "2 hours ago" },
                        { title: "Literature Review", score: 88, time: "Yesterday" },
                        { title: "Research Paper Summary", score: 95, time: "2 days ago" }
                      ].map((session, index) => (
                        <div key={index} className="flex items-center justify-between p-3 sm:p-4 bg-white dark:bg-surface-600 rounded-lg">
                          <div className="flex-1">
                            <p className="font-medium text-surface-800 dark:text-surface-100 text-sm sm:text-base">
                              {session.title}
                            </p>
                            <p className="text-xs sm:text-sm text-surface-500 dark:text-surface-400">
                              {session.time}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg sm:text-xl font-bold text-secondary-600">
                              {session.score}%
                            </span>
                            <ApperIcon name="CheckCircle" className="h-4 w-4 sm:h-5 sm:w-5 text-secondary-500" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Highlight & Note Tab */}
            {activeTab === 'highlight' && (
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 h-[600px]">
                  {/* Reading Area */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <h4 className="text-lg sm:text-xl font-bold text-surface-800 dark:text-surface-100">
                        Reading & Highlighting
                      </h4>
                      
                      {/* Sample Text Loader */}
                      <div className="flex flex-wrap gap-2">
                        {sampleTexts.map((sample, index) => (
                          <button
                            key={index}
                            onClick={() => handleLoadSampleText(sample.content)}
                            className="px-3 py-1 text-xs bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors"
                          >
                            {sample.title}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Text Input Area */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-surface-700 dark:text-surface-200 mb-2">
                        Load your text for highlighting
                      </label>
                      <textarea
                        value={readingText}
                        onChange={(e) => setReadingText(e.target.value)}
                        placeholder="Paste text here or use uploaded text from Analysis tab..."
                        className="w-full h-24 px-4 py-3 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none text-sm"
                      />
                      
                      {uploadedText && (
                        <button
                          onClick={() => setReadingText(uploadedText)}
                          className="mt-2 px-4 py-2 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded-lg hover:bg-primary-200 dark:hover:bg-primary-700 transition-colors text-sm"
                        >
                          Use Uploaded Text
                        </button>
                      )}
                    </div>

                    {/* Reading Area */}
                    <div className="relative">
                      <div
                        ref={readingAreaRef}
                        className="h-96 overflow-y-auto p-6 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-xl reading-focus highlight-selection"
                        onMouseUp={handleTextSelection}
                        onTouchEnd={handleTextSelection}
                      >
                        {readingText ? (
                          <div 
                            className="text-surface-800 dark:text-surface-200 leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: renderHighlightedText(readingText) }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-center">
                            <ApperIcon name="BookOpen" className="h-12 w-12 text-surface-400 mb-4" />
                            <p className="text-surface-500 dark:text-surface-400">
                              Load sample text or paste your own content to start highlighting
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Highlight Toolbar */}
                      {showHighlightToolbar && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute bottom-4 left-4 right-4 p-4 bg-white dark:bg-surface-800 border border-surface-300 dark:border-surface-600 rounded-xl shadow-lg"
                        >
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-surface-700 dark:text-surface-200">
                              Selected: "{selectedText.slice(0, 50)}..."
                            </p>
                            
                            {/* Color Selection */}
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-surface-600 dark:text-surface-400">Color:</span>
                              {highlightColors.map((color) => (
                                <button
                                  key={color.name}
                                  onClick={() => setHighlightColor(color.name)}
                                  className={`w-6 h-6 rounded-full ${color.bg} border-2 ${
                                    highlightColor === color.name ? color.border : 'border-transparent'
                                  } hover:scale-110 transition-transform`}
                                />
                              ))}
                            </div>
                            
                            {/* Note Input */}
                            <input
                              type="text"
                              value={highlightNote}
                              onChange={(e) => setHighlightNote(e.target.value)}
                              placeholder="Add a note (optional)"
                              className="w-full px-3 py-2 bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            />
                            
                            {/* Action Buttons */}
                            <div className="flex space-x-2">
                              <button
                                onClick={handleCreateHighlight}
                                className="flex-1 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors text-sm font-medium"
                              >
                                <ApperIcon name="Highlighter" className="h-4 w-4 mr-2 inline" />
                                Highlight
                              </button>
                              <button
                                onClick={() => setShowHighlightToolbar(false)}
                                className="px-4 py-2 bg-surface-300 dark:bg-surface-600 text-surface-700 dark:text-surface-200 rounded-lg hover:bg-surface-400 dark:hover:bg-surface-500 transition-colors text-sm"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Highlights Sidebar */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h5 className="text-lg font-semibold text-surface-800 dark:text-surface-100">
                        My Highlights
                      </h5>
                      <span className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-200 rounded-lg text-xs font-medium">
                        {highlights.length}
                      </span>
                    </div>

                    {/* Search Highlights */}
                    <div className="relative">
                      <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search highlights..."
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Highlights List */}
                    <div className="h-96 overflow-y-auto space-y-3 scrollbar-hide">
                      {filteredHighlights.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <ApperIcon name="Highlighter" className="h-8 w-8 text-surface-400 mb-2" />
                          <p className="text-sm text-surface-500 dark:text-surface-400">
                            {highlights.length === 0 ? 'No highlights yet' : 'No highlights match your search'}
                          </p>
                        </div>
                      ) : (
                        filteredHighlights.map((highlight) => (
                          <motion.div
                            key={highlight.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 bg-white dark:bg-surface-800 border-l-4 border-${highlight.color}-400 rounded-lg shadow-sm`}
                          >
                            <div className="space-y-2">
                              <p className="text-sm text-surface-800 dark:text-surface-200 font-medium line-clamp-2">
                                "{highlight.text}"
                              </p>
                              
                              {editingHighlight === highlight.id ? (
                                <div className="space-y-2">
                                  <textarea
                                    defaultValue={highlight.note}
                                    className="w-full p-2 text-xs bg-surface-50 dark:bg-surface-700 border border-surface-300 dark:border-surface-600 rounded focus:ring-1 focus:ring-primary-500 resize-none"
                                    rows="2"
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault()
                                        handleEditHighlight(highlight.id, e.target.value)
                                      }
                                    }}
                                  />
                                  <div className="flex space-x-1">
                                    <button
                                      onClick={(e) => {
                                        const textarea = e.target.closest('.space-y-2').querySelector('textarea')
                                        handleEditHighlight(highlight.id, textarea.value)
                                      }}
                                      className="px-2 py-1 bg-primary-500 text-white rounded text-xs hover:bg-primary-600"
                                    >
                                      Save
                                    </button>
                                    <button
                                      onClick={() => setEditingHighlight(null)}
                                      className="px-2 py-1 bg-surface-300 dark:bg-surface-600 text-surface-700 dark:text-surface-200 rounded text-xs hover:bg-surface-400 dark:hover:bg-surface-500"
                                    >
                                      Cancel
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-xs text-surface-600 dark:text-surface-400">
                                  {highlight.note || 'No note'}
                                </p>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-surface-500 dark:text-surface-400">
                                  {highlight.timestamp.toLocaleDateString()}
                                </span>
                                <div className="flex space-x-1">
                                  <button
                                    onClick={() => setEditingHighlight(highlight.id)}
                                    className="p-1 text-surface-400 hover:text-primary-500 transition-colors"
                                  >
                                    <ApperIcon name="Edit2" className="h-3 w-3" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (window.confirm('Delete this highlight?')) {
                                        handleDeleteHighlight(highlight.id)
                                      }
                                    }}
                                    className="p-1 text-surface-400 hover:text-red-500 transition-colors"
                                  >
                                    <ApperIcon name="Trash2" className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </section>