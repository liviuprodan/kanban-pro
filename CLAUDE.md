# CLAUDE.md - AI Assistant Guide for Kanban Pro

## Project Overview

Kanban Pro is a modern project management application built with Next.js 16, React 19, and TypeScript. It implements a Kanban board with drag-and-drop functionality for task management.

**Current State**: Functional local-only Kanban board with basic authentication. Has scaffolding for SaaS features (Clerk auth, Stripe payments, Supabase database) but these are not yet fully integrated.

## Technology Stack

- **Framework**: Next.js 16 with App Router
- **UI**: React 19, TypeScript
- **Styling**: Tailwind CSS v4 with custom glassmorphism theme
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit/core, @dnd-kit/sortable
- **Icons**: Lucide React
- **Storage**: localStorage (no backend database currently)

## Directory Structure

```
kanban-pro/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with metadata
│   ├── page.tsx           # Home page (Board with AuthGuard)
│   ├── globals.css        # Global styles, glassmorphism effects
│   ├── login/page.tsx     # Login page
│   ├── pricing/page.tsx   # Pricing plans page
│   └── subscribe/page.tsx # Subscription page
├── components/             # React components
│   ├── AuthGuard.tsx      # Auth wrapper
│   ├── Board.tsx          # Main Kanban board (361 lines)
│   ├── Card.tsx           # Task card
│   ├── CardModal.tsx      # Create/edit modal
│   └── Column.tsx         # Column container
├── hooks/                  # Custom React hooks
│   └── useLocalStorage.ts # Generic localStorage hook
├── lib/                    # Utilities and types
│   ├── types.ts           # TypeScript interfaces
│   └── storage.ts         # localStorage operations
└── config files           # next.config.js, tailwind.config.ts, etc.
```

## Key Conventions

### Naming Conventions

- **Components**: PascalCase (`CardModal.tsx`)
- **Hooks/Utils**: camelCase (`useLocalStorage.ts`, `storage.ts`)
- **Pages**: lowercase (`page.tsx`)
- **Variables/Functions**: camelCase
- **Types/Interfaces**: PascalCase
- **CSS Classes**: kebab-case (`glass-strong`)

### ID Generation Pattern

```typescript
`${type}-${Date.now()}`  // e.g., 'card-1731960123456'
```

### Handler Function Naming

Prefix event handlers with `handle`:
```typescript
handleAddCard, handleDragEnd, handleUpdateCard, handleDeleteCard
```

### Component Structure

- One component per file
- Props interfaces defined inline
- Client components marked with `'use client'`
- State lifted to Board component

## Core Data Types

```typescript
// lib/types.ts
interface Card {
  id: string
  title: string
  description: string
  columnId: string
  notes: string
  createdAt: number      // Unix timestamp
  updatedAt: number      // Unix timestamp
  color?: string
}

interface Column {
  id: string
  title: string
  order: number
}

interface BoardState {
  columns: Column[]
  cards: Card[]
}
```

## Default Columns (Protected)

These three columns cannot be deleted:
- `todo` - "TODO"
- `in-progress` - "In Progress"
- `completed` - "Completed"

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (default port 3000)
npm run build        # Build for production
npm run start        # Start production server
```

## Authentication

**Current Implementation**: Simple localStorage-based auth

**Hardcoded Credentials** (in `app/login/page.tsx`):
- Username: `Liviu11`
- Password: `Zara_2025`

**Auth Check**: `localStorage.getItem('kanban_authenticated') === 'true'`

## Storage Operations

All board state operations are in `lib/storage.ts`:
- `loadBoardState()` - Load from localStorage
- `saveBoardState(state)` - Save to localStorage
- `addCard(card)`, `updateCard(id, card)`, `deleteCard(id)`
- `addColumn(column)`, `deleteColumn(id)`
- `moveCard(cardId, newColumnId)`

Storage key: `kanban_board_state`

## Styling Patterns

### Glassmorphism Classes
```css
.glass          /* Light glass effect */
.glass-strong   /* Strong glass effect with blur */
```

### Glow Effects
```css
.glow-indigo, .glow-purple, .glow-pink
```

### Theme Colors
- Primary: `#5106f4` (purple)
- Secondary: `#00d9b3` (teal)
- Accent: `#ffa500` (orange)
- Brand Cyan: `#00D9FF`

### Framer Motion Patterns

Common animation props:
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
exit={{ opacity: 0, y: -20 }}
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## DnD Kit Setup

```typescript
const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor)
)

// Context structure
<DndContext sensors={sensors} onDragEnd={handleDragEnd}>
  <SortableContext items={columns}>
    {/* columns and cards */}
  </SortableContext>
  <DragOverlay>{/* drag preview */}</DragOverlay>
</DndContext>
```

## Key Components Overview

### Board.tsx (Main Component)
- DnD context setup
- All CRUD operations for cards/columns
- Search filtering
- Progress statistics
- State management

### Card.tsx
- Draggable card with useSortable hook
- Color accent bar
- Hover actions (edit/delete)
- Notes count indicator

### CardModal.tsx
- Form with title, description, notes
- Column selector, color picker
- Keyboard shortcuts: Ctrl+Enter (save), Escape (close)

### Column.tsx
- SortableContext for cards
- Dynamic gradient by column type
- Delete button (custom columns only)

## Environment Variables

Required in `.env.local`:
```bash
# Currently placeholders - app works without them using localStorage
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3002
```

## Common Development Tasks

### Adding a New Card Field
1. Update `Card` interface in `lib/types.ts`
2. Update `CardModal.tsx` form
3. Update `Card.tsx` display
4. Update storage operations if needed

### Adding a New Column Action
1. Add handler in `Board.tsx`
2. Pass handler to `Column.tsx` via props
3. Add UI element in `Column.tsx`

### Modifying Card Colors
Available colors in `CardModal.tsx`:
```typescript
['#00D9FF', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B', '#EF4444']
```

### Adding New Pages
1. Create directory in `app/`
2. Add `page.tsx`
3. Wrap with `AuthGuard` if protected

## Important Files to Know

- **Main Logic**: `components/Board.tsx`
- **Type Definitions**: `lib/types.ts`
- **Storage Logic**: `lib/storage.ts`
- **Global Styles**: `app/globals.css`
- **Theme Config**: `tailwind.config.ts`

## Current Limitations

- Single-user only (localStorage)
- No data sync between devices
- Hardcoded auth credentials
- No API routes implemented
- Pricing/subscription pages are UI mockups

## Planned Features (Not Yet Implemented)

- Supabase database integration
- Clerk authentication
- Stripe/Lemon Squeezy payments
- Multi-user collaboration
- Card templates and attachments
- Activity history
- Export/Import
- Dark mode toggle

## Code Quality Guidelines

1. **TypeScript**: Use strict typing, define interfaces for props
2. **Components**: Keep components focused, extract reusable logic to hooks
3. **State**: Prefer lifting state over prop drilling
4. **Styling**: Use Tailwind utilities, custom classes for complex effects
5. **Animations**: Use Framer Motion for complex animations
6. **Accessibility**: Include aria labels, keyboard navigation support

## Testing Notes

No test framework is currently configured. When adding tests:
- Consider Jest + React Testing Library
- Test storage operations
- Test component interactions
- Test drag-and-drop behavior

## Deployment

- **Target Platform**: Vercel
- **Build Command**: `npm run build`
- **Output**: `.next/` directory
