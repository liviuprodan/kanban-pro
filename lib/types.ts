export interface Card {
  id: string
  title: string
  description: string
  columnId: string
  notes: string
  createdAt: number
  updatedAt: number
  color?: string
}

export interface Column {
  id: string
  title: string
  order: number
}

export interface BoardState {
  columns: Column[]
  cards: Card[]
}
