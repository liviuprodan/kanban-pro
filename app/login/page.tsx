'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sparkles, Lock, User } from 'lucide-react'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Credențiale hardcodate - poți schimba aici username și parola
    if (username === 'Liviu11' && password === 'Zara_2025') {
      localStorage.setItem('kanban_authenticated', 'true')
      router.push('/')
    } else {
      setError('Invalid username or password')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
        className="glass-strong rounded-2xl shadow-2xl w-full max-w-md p-8 border border-white/20"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto rounded-xl flex items-center justify-center mb-4"
            style={{ backgroundColor: '#00D9FF' }}
          >
            <Sparkles className="w-8 h-8 text-slate-900" />
          </motion.div>
          <h1 className="text-3xl font-black mb-2" style={{ color: '#00D9FF' }}>
            Kanban Pro
          </h1>
          <p className="text-slate-400 text-sm font-medium">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full pl-12 pr-4 py-3 glass-strong rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 transition-all border border-white/10"
                autoFocus
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full pl-12 pr-4 py-3 glass-strong rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50 transition-all border border-white/10"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 text-red-300 text-sm font-medium text-center"
            >
              {error}
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full px-4 py-3 text-sm font-bold text-slate-900 rounded-xl transition-all"
            style={{ backgroundColor: '#00D9FF' }}
          >
            Sign In
          </motion.button>
        </form>

        {/* Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            Default credentials: Liviu11 / Zara_2025
          </p>
        </div>
      </motion.div>
    </div>
  )
}
