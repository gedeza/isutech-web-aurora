/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9c7c0b",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#9c7c0b",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#9c7c0b",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        'header': '4.5rem',
        'section': '6rem',
      },
      maxWidth: {
        'container': '1200px',
      },
      boxShadow: {
        'card': '0 2px 8px 0 rgb(0 0 0 / 0.1)',
        'card-hover': '0 8px 24px 0 rgb(0 0 0 / 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-up': 'slideUp 0.4s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'scroll-x': 'scroll-x 40s linear infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'scale': 'scale 0.15s ease-in-out',
        'rotate-bounce': 'rotate-bounce 0.3s ease-in-out',
        'marquee-left': 'marquee-left 15s linear infinite',
        'marquee-right': 'marquee-right 15s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'scroll-x': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        scale: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        'rotate-bounce': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(5deg) scale(1.1)' },
          '100%': { transform: 'rotate(0deg) scale(1)' },
        },
        'marquee-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        'marquee-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' }
        },
      },
    },
  },
  plugins: [],
}

