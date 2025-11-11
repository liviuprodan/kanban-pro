# Kanban Board App

A beautiful, modern project management Kanban board application built with Next.js, Tailwind CSS, and Framer Motion.

## Features

✨ **Beautiful UI** - Clean, modern design inspired by contemporary design systems
🎨 **Smooth Animations** - Fluid drag-and-drop with Framer Motion
📝 **Task Management** - Create, edit, and delete cards with titles, descriptions, and notes
🏷️ **Color Coding** - Assign colors to cards for quick visual identification
📊 **Multiple Columns** - Pre-configured TODO, In Progress, and Completed columns
➕ **Custom Columns** - Add unlimited custom columns and remove them when needed
💾 **Local Storage** - Automatic persistence of all data (no backend required)
📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
⌨️ **Keyboard Support** - Full keyboard navigation and shortcuts

## Tech Stack

- **Framework**: Next.js 16 with React 19
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Drag & Drop**: @dnd-kit
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd kanban-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage

### Creating Cards

1. Click "Add Card" button in any column
2. Fill in the title (required), description, and notes
3. Optionally select a color
4. Click "Save Card"

### Editing Cards

1. Hover over a card and click the edit icon
2. Modify any field
3. Click "Save Card"

### Moving Cards

1. Click and drag a card to move it to another column
2. The card will smoothly animate to its new position
3. Changes are automatically saved

### Deleting Cards

1. Hover over a card and click the trash icon
2. The card will be removed immediately

### Managing Columns

1. Click "Add Column" button on the right
2. New columns can be deleted by clicking the trash icon on the column header
3. The default columns (TODO, In Progress, Completed) cannot be deleted

## Keyboard Shortcuts

- **Escape**: Close modal or cancel operation
- **Ctrl/Cmd + Enter**: Save card while editing

## Data Persistence

All data is stored in your browser's localStorage, so:
- Your board persists between sessions
- No account or server required
- Data is stored locally on your device
- Clear browser cache to reset

## Development

### Build for Production

```bash
npm run build
npm run start
```

### TypeScript

Full TypeScript support with strict mode enabled.

## Project Structure

```
kanban-app/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Board.tsx          # Main board component
│   ├── Column.tsx         # Column component
│   ├── Card.tsx           # Card component
│   └── CardModal.tsx      # Card editing modal
├── hooks/                 # Custom React hooks
│   └── useLocalStorage.ts # Local storage hook
├── lib/                   # Utility functions
│   ├── types.ts          # TypeScript types
│   └── storage.ts        # Storage operations
└── public/               # Static assets
```

## Customization

### Color Scheme

Edit `tailwind.config.ts` to customize colors:

```typescript
colors: {
  'primary': '#5106f4',
  'secondary': '#00d9b3',
  'accent': '#ffa500',
  // ... more colors
}
```

### Default Columns

Modify the initial columns in `lib/storage.ts`:

```typescript
const initialState: BoardState = {
  columns: [
    { id: 'todo', title: 'TODO', order: 0 },
    { id: 'in-progress', title: 'In Progress', order: 1 },
    { id: 'completed', title: 'Completed', order: 2 },
  ],
  cards: [],
}
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Performance

- Optimized with Next.js 16 Turbopack
- Smooth 60fps animations
- Efficient local storage usage
- Lazy component loading

## Future Enhancements

Potential features for future versions:
- Backend integration with database
- User authentication & multi-user collaboration
- Card templates
- Custom themes
- Card attachments
- Activity history
- Export/Import functionality
- Dark mode

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues or feature requests, please create an issue in the repository.

---

Built with ❤️ using Next.js and React
