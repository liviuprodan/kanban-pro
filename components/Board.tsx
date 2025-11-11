'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Filter, BarChart3, Sparkles, RefreshCw, LogOut } from 'lucide-react'
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { Card as CardType, Column as ColumnType, BoardState } from '@/lib/types'
import { loadBoardState, saveBoardState, addCard, updateCard, deleteCard, addColumn, deleteColumn, moveCard } from '@/lib/storage'
import { Column } from './Column'
import { CardModal } from './CardModal'

export function Board() {
  const router = useRouter()
  const [state, setState] = useState<BoardState | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedCard, setDraggedCard] = useState<CardType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const initialState = loadBoardState()
    setState(initialState)
  }, [])

  useEffect(() => {
    if (state) {
      saveBoardState(state)
    }
  }, [state])

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = state?.cards.find(c => c.id === active.id)
    if (card) {
      setIsDragging(true)
      setDraggedCard(card)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setIsDragging(false)
    setDraggedCard(null)

    const { active, over } = event
    if (!over || !state) return

    const draggedCardData = state.cards.find(c => c.id === active.id)
    if (!draggedCardData) return

    const overColumnId = over.id as string

    if (draggedCardData.columnId !== overColumnId) {
      const newState = moveCard(state, draggedCardData.id, draggedCardData.columnId, overColumnId, 0)
      setState(newState)
    }
  }

  const handleAddCard = (columnId: string) => {
    const newCard: CardType = {
      id: `card-${Date.now()}`,
      title: '',
      description: '',
      columnId,
      notes: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      color: '#6366f1',
    }
    setSelectedCard(newCard)
    setIsModalOpen(true)
  }

  const handleEditCard = (card: CardType) => {
    setSelectedCard(card)
    setIsModalOpen(true)
  }

  const handleSaveCard = (card: CardType) => {
    if (!state) return

    const isNew = !state.cards.find(c => c.id === card.id)

    if (isNew) {
      setState(addCard(state, card))
    } else {
      setState(updateCard(state, card.id, card))
    }
  }

  const handleDeleteCard = (cardId: string) => {
    if (!state) return
    setState(deleteCard(state, cardId))
  }

  const handleAddColumn = () => {
    if (!state) return

    const newColumn: ColumnType = {
      id: `column-${Date.now()}`,
      title: 'New Column',
      order: state.columns.length,
    }

    setState(addColumn(state, newColumn))
  }

  const handleDeleteColumn = (columnId: string) => {
    if (!state) return
    setState(deleteColumn(state, columnId))
  }

  const handleResetBoard = () => {
    if (confirm('Are you sure you want to reset the entire board? This will delete all tasks and columns.')) {
      localStorage.removeItem('kanban_board_state')
      window.location.reload()
    }
  }

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('kanban_authenticated')
      router.push('/login')
    }
  }

  const filteredCards = (columnId: string) => {
    if (!state) return []
    const columnCards = state.cards.filter(card => card.columnId === columnId)
    if (!searchQuery) return columnCards

    return columnCards.filter(card =>
      card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }

  const getTotalCards = () => state?.cards.length || 0
  const getCompletedCards = () => state?.cards.filter(c => c.columnId === 'completed').length || 0
  const getProgressPercent = () => {
    const total = getTotalCards()
    if (total === 0) return 0
    return Math.round((getCompletedCards() / total) * 100)
  }

  if (!state) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-slate-400 font-medium">Loading your board...</p>
        </div>
      </div>
    )
  }

  const columnIds = state.columns.map(col => col.id)

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen">
        {/* Header with glassmorphism */}
        <div className="glass-strong sticky top-0 z-30 border-b border-white/10">
          <div className="max-w-full mx-auto px-8 py-6">
            <div className="flex items-center justify-between mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00D9FF' }}>
                  <Sparkles className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-3xl font-black" style={{ color: '#00D9FF' }}>
                    Kanban Pro
                  </h1>
                  <p className="text-slate-400 text-sm font-medium">Supercharge your productivity</p>
                </div>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4"
              >
                <div className="glass px-4 py-2 rounded-xl flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-indigo-400" />
                  <div>
                    <div className="text-xs text-slate-400">Progress</div>
                    <div className="text-lg font-bold text-white">{getProgressPercent()}%</div>
                  </div>
                </div>
                <div className="glass px-4 py-2 rounded-xl">
                  <div className="text-xs text-slate-400">Tasks</div>
                  <div className="text-lg font-bold text-white">{getCompletedCards()}/{getTotalCards()}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 180 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleResetBoard}
                  className="glass px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all border border-white/10"
                  title="Reset entire board"
                >
                  <RefreshCw className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="glass px-3 py-2 rounded-xl text-slate-400 hover:text-red-400 hover:border-red-500/50 transition-all border border-white/10"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>

            {/* Search and filters */}
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 glass rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass px-4 py-3 rounded-xl flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Filter className="w-5 h-5" />
                <span className="font-medium">Filters</span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Board Container */}
        <div className="px-8 py-8">
          <SortableContext items={columnIds} strategy={verticalListSortingStrategy}>
            <div className="flex gap-6 overflow-x-auto pb-8 min-h-[calc(100vh-300px)]">
              <AnimatePresence mode="popLayout">
                {state.columns.map((column, idx) => {
                  const columnCards = filteredCards(column.id)

                  return (
                    <motion.div
                      key={column.id}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <SortableContext
                        items={columnCards.map(c => c.id)}
                        strategy={verticalListSortingStrategy}
                      >
                        <Column
                          column={column}
                          cards={columnCards}
                          onAddCard={handleAddCard}
                          onEditCard={handleEditCard}
                          onDeleteCard={handleDeleteCard}
                          onDeleteColumn={handleDeleteColumn}
                        />
                      </SortableContext>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Add Column Button */}
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddColumn}
                className="flex flex-col items-center justify-center gap-3 min-w-[320px] h-fit px-6 py-8 glass rounded-2xl border-2 border-dashed border-white/20 text-slate-400 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition-all duration-300 font-medium flex-shrink-0 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 group-hover:bg-indigo-500/20 flex items-center justify-center transition-all">
                  <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </div>
                <span>Add Column</span>
              </motion.button>
            </div>
          </SortableContext>
        </div>
      </div>

      {/* Drag Overlay with glow */}
      <DragOverlay>
        {isDragging && draggedCard ? (
          <motion.div
            initial={{ scale: 1, opacity: 1, rotate: 0 }}
            animate={{ scale: 1.1, opacity: 0.95, rotate: 3 }}
            className="glass-strong rounded-2xl p-5 w-80 cursor-grabbing border-l-4 glow-indigo"
            style={{ borderLeftColor: draggedCard.color || '#6366f1' }}
          >
            <h3 className="font-bold text-white text-sm mb-2">{draggedCard.title}</h3>
            {draggedCard.description && (
              <p className="text-xs text-slate-300">{draggedCard.description}</p>
            )}
          </motion.div>
        ) : null}
      </DragOverlay>

      {/* Card Modal */}
      <CardModal
        isOpen={isModalOpen}
        card={selectedCard}
        isNew={!state.cards.find(c => c.id === selectedCard?.id)}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedCard(null)
        }}
        onSave={handleSaveCard}
        columns={state.columns}
      />
    </DndContext>
  )
}
