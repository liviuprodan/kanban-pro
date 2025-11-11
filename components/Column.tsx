'use client'

import { motion } from 'framer-motion'
import { Plus, Trash2, MoreVertical } from 'lucide-react'
import { Card as CardType, Column as ColumnType } from '@/lib/types'
import { Card } from './Card'

interface ColumnProps {
  column: ColumnType
  cards: CardType[]
  onAddCard: (columnId: string) => void
  onEditCard: (card: CardType) => void
  onDeleteCard: (id: string) => void
  onDeleteColumn: (id: string) => void
}

export function Column({
  column,
  cards,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onDeleteColumn,
}: ColumnProps) {
  const getColumnGradient = (id: string) => {
    switch (id) {
      case 'todo':
        return 'from-blue-500/20 to-cyan-500/20'
      case 'in-progress':
        return 'from-yellow-500/20 to-orange-500/20'
      case 'completed':
        return 'from-green-500/20 to-emerald-500/20'
      default:
        return 'from-purple-500/20 to-pink-500/20'
    }
  }

  const getColumnAccent = (id: string) => {
    switch (id) {
      case 'todo':
        return '#3b82f6'
      case 'in-progress':
        return '#f59e0b'
      case 'completed':
        return '#10b981'
      default:
        return '#a855f7'
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col w-80 glass rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 relative group"
      style={{
        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
      }}
    >
      {/* Gradient accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getColumnGradient(column.id)}`}
        style={{ opacity: 0.8 }}
      />

      {/* Column Header */}
      <div className="px-5 py-4 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-2 h-8 rounded-full"
              style={{
                background: `linear-gradient(180deg, ${getColumnAccent(column.id)}dd, ${getColumnAccent(column.id)}66)`,
                boxShadow: `0 0 15px ${getColumnAccent(column.id)}44`,
              }}
            />
            <div>
              <h2 className="font-bold text-white text-base">{column.title}</h2>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-2.5 py-1 rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: `${getColumnAccent(column.id)}33` }}
            >
              {cards.length}
            </motion.div>
          </div>
          <div className="flex items-center gap-1">
            {column.id !== 'todo' && column.id !== 'in-progress' && column.id !== 'completed' && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDeleteColumn(column.id)}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
                title="Delete column"
              >
                <Trash2 size={16} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <MoreVertical size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Cards List with proper scroll */}
      <div className="flex-1 overflow-y-auto space-y-3 px-4 py-4 scrollbar-thin min-h-[400px]">
        {cards.length > 0 ? (
          <>
            {cards.map((card, idx) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card
                  card={card}
                  onEdit={onEditCard}
                  onDelete={onDeleteCard}
                />
              </motion.div>
            ))}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-16 text-slate-500"
          >
            <div className="text-center">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-4xl mb-3 opacity-30"
              >
                📝
              </motion.div>
              <p className="text-sm font-medium">No tasks yet</p>
              <p className="text-xs mt-1 opacity-60">Add one to get started!</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Add Card Button */}
      <div className="p-4 border-t border-white/10 flex-shrink-0">
        <motion.button
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onAddCard(column.id)}
          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl glass-strong border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all duration-200 font-semibold text-sm group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-indigo-500/10 to-indigo-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <Plus size={18} className="relative z-10" />
          <span className="relative z-10">Add Task</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
