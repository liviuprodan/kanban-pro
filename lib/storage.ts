import { BoardState, Card, Column } from './types'

const STORAGE_KEY = 'kanban_board_state'

const initialState: BoardState = {
  columns: [
    { id: 'todo', title: 'TODO', order: 0 },
    { id: 'in-progress', title: 'In Progress', order: 1 },
    { id: 'completed', title: 'Completed', order: 2 },
  ],
  cards: [],
}

export const loadBoardState = (): BoardState => {
  if (typeof window === 'undefined') return initialState

  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : initialState
  } catch (error) {
    console.error('Failed to load board state:', error)
    return initialState
  }
}

export const saveBoardState = (state: BoardState): void => {
  if (typeof window === 'undefined') return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.error('Failed to save board state:', error)
  }
}

export const addCard = (state: BoardState, card: Card): BoardState => {
  return {
    ...state,
    cards: [...state.cards, card],
  }
}

export const updateCard = (state: BoardState, cardId: string, updates: Partial<Card>): BoardState => {
  return {
    ...state,
    cards: state.cards.map(card =>
      card.id === cardId ? { ...card, ...updates, updatedAt: Date.now() } : card
    ),
  }
}

export const deleteCard = (state: BoardState, cardId: string): BoardState => {
  return {
    ...state,
    cards: state.cards.filter(card => card.id !== cardId),
  }
}

export const addColumn = (state: BoardState, column: Column): BoardState => {
  return {
    ...state,
    columns: [...state.columns, column].sort((a, b) => a.order - b.order),
  }
}

export const deleteColumn = (state: BoardState, columnId: string): BoardState => {
  return {
    ...state,
    columns: state.columns.filter(col => col.id !== columnId),
    cards: state.cards.filter(card => card.columnId !== columnId),
  }
}

export const moveCard = (
  state: BoardState,
  cardId: string,
  _fromColumnId: string,
  toColumnId: string,
  _newPosition: number
): BoardState => {
  const card = state.cards.find(c => c.id === cardId)
  if (!card) return state

  const updatedCard = { ...card, columnId: toColumnId, updatedAt: Date.now() }
  const newCards = state.cards.map(c =>
    c.id === cardId ? updatedCard : c
  )

  return {
    ...state,
    cards: newCards,
  }
}
