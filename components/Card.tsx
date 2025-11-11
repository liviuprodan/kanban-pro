'use client'

import { motion } from 'framer-motion'
import { Edit2, Trash2, MessageSquare, Clock } from 'lucide-react'
import { Card as CardType } from '@/lib/types'

interface CardProps {
  card: CardType
  onEdit: (card: CardType) => void
  onDelete: (id: string) => void
  isDragging?: boolean
}

export function Card({ card, onEdit, onDelete, isDragging = false }: CardProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <motion.div
      layout
      layoutId={card.id}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group relative glass-strong rounded-xl p-4 border border-white/10 cursor-grab active:cursor-grabbing transition-all duration-200 overflow-hidden ${
        isDragging ? 'opacity-50 scale-95' : ''
      }`}
    >
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 pointer-events-none" />

      {/* Color accent bar */}
      {card.color && (
        <motion.div
          layoutId={`color-${card.id}`}
          className="absolute top-0 left-0 right-0 h-1"
          style={{
            background: card.color,
            boxShadow: `0 2px 8px ${card.color}66`,
          }}
        />
      )}

      <div className="space-y-3 pt-1 relative z-10">
        {/* Card Title */}
        <h3 className="font-bold text-white text-sm line-clamp-2 leading-tight pr-16">
          {card.title}
        </h3>

        {/* Card Description */}
        {card.description && (
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {card.description}
          </p>
        )}

        {/* Card Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <div className="flex items-center gap-2">
            {card.notes && (
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg"
                style={{
                  backgroundColor: `${card.color}22`,
                  color: card.color
                }}
              >
                <MessageSquare size={12} />
                {card.notes.split('\n').filter(n => n.trim()).length}
              </motion.div>
            )}
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              {formatDate(card.updatedAt || card.createdAt)}
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons with glassmorphism */}
      <div className="absolute top-3 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            onEdit(card)
          }}
          className="p-2 rounded-lg glass-strong border border-white/10 backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(99, 102, 241, 0.2)' }}
          title="Edit card"
        >
          <Edit2 size={14} className="text-indigo-300" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation()
            onDelete(card.id)
          }}
          className="p-2 rounded-lg glass-strong border border-white/10 backdrop-blur-xl"
          style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)' }}
          title="Delete card"
        >
          <Trash2 size={14} className="text-red-300" />
        </motion.button>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          boxShadow: `0 0 20px ${card.color}33, 0 0 40px ${card.color}11`,
        }}
      />
    </motion.div>
  )
}
