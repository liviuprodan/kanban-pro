import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#5106f4',
        'primary-foreground': '#ffffff',
        'secondary': '#00d9b3',
        'secondary-foreground': '#ffffff',
        'accent': '#ffa500',
        'accent-foreground': '#000000',
        'destructive': '#ff4444',
        'destructive-foreground': '#ffffff',
        'muted': '#f3f3f3',
        'muted-foreground': '#666666',
        'background': '#f8f8f8',
        'foreground': '#1a1a1a',
        'card': '#ffffff',
        'card-foreground': '#1a1a1a',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 16px rgba(0,0,0,0.1)',
        'card-drag': '0 20px 25px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
