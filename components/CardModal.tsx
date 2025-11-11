'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Card as CardType, Column } from '@/lib/types'

interface CardModalProps {
  isOpen: boolean
  card: CardType | null
  isNew?: boolean
  onClose: () => void
  onSave: (card: CardType) => void
  columns: Column[]
}

export function CardModal({ isOpen, card, isNew = false, onClose, onSave, columns }: CardModalProps) {
  const [formData, setFormData] = useState<CardType | null>(null)

  useEffect(() => {
    if (card) {
      setFormData(card)
    }
  }, [card])

  if (!formData) return null

  const handleSave = () => {
    if (formData.title.trim()) {
      onSave(formData)
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave()
    }
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-40"
          />

          {/* Modal with glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 glass-strong rounded-2xl shadow-2xl z-50 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white/20"
          >
            <div className="p-8 space-y-6">
              {/* Header with gradient */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center glow-indigo">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      {isNew ? 'Create Task' : 'Edit Task'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1 font-medium">
                      {isNew ? 'Add a new task to your board' : 'Update your task details'}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
                >
                  <X size={20} className="text-slate-300" />
                </motion.button>
              </div>

              {/* Form */}
              <div className="space-y-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Task Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 glass-strong rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-white/10"
                    autoFocus
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="Add more details about this task..."
                    rows={3}
                    className="w-full px-4 py-3 glass-strong rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none border border-white/10"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Notes
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    onKeyDown={handleKeyDown}
                    placeholder="Add internal notes or comments..."
                    rows={4}
                    className="w-full px-4 py-3 glass-strong rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all resize-none border border-white/10"
                  />
                </div>

                {/* Column Selector */}
                <div>
                  <label className="block text-sm font-bold text-white mb-2">
                    Status
                  </label>
                  <select
                    value={formData.columnId}
                    onChange={(e) => setFormData({ ...formData, columnId: e.target.value })}
                    className="w-full px-4 py-3 glass-strong rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all border border-white/10 appearance-none cursor-pointer"
                  >
                    {columns.map((col) => (
                      <option key={col.id} value={col.id} className="bg-slate-800 text-white">
                        {col.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Color Picker */}
                <div>
                  <label className="block text-sm font-bold text-white mb-3">
                    Color Tag
                  </label>
                  <div className="flex gap-3">
                    {[
                      { color: '#6366f1', name: 'Indigo' },
                      { color: '#8b5cf6', name: 'Purple' },
                      { color: '#ec4899', name: 'Pink' },
                      { color: '#f59e0b', name: 'Amber' },
                      { color: '#10b981', name: 'Emerald' },
                      { color: '#3b82f6', name: 'Blue' },
                    ].map(({ color, name }) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.2, y: -4 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-11 h-11 rounded-xl transition-all ${
                          formData.color === color ? 'ring-2 ring-offset-2 ring-offset-slate-900 shadow-xl' : 'opacity-60 hover:opacity-100'
                        }`}
                        style={{
                          backgroundColor: color,
                          boxShadow: formData.color === color ? `0 8px 16px ${color}66` : 'none',
                        }}
                        title={name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-6 border-t border-white/10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                  className="flex-1 px-4 py-3 text-sm font-bold text-slate-300 glass rounded-xl hover:bg-white/10 transition-colors border border-white/10"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex-1 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all glow-indigo"
                >
                  {isNew ? 'Create Task' : 'Save Changes'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
