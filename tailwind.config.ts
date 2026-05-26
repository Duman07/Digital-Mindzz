import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Digital Mindz
        'dm-dark':      '#0F172A',
        'dm-dark-2':    '#1E293B',
        'dm-blue':      '#2563EB',
        'dm-cyan':      '#06B6D4',
        'dm-white':     '#F8FAFC',
        'dm-gray':      '#94A3B8',
        'dm-blue-light':'#3B82F6',
        'dm-cyan-light':'#22D3EE',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'gradient-dm':     'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)',
        'gradient-blue':   'linear-gradient(135deg, #2563EB, #06B6D4)',
        'gradient-hero':   'radial-gradient(ellipse at 50% 0%, rgba(37,99,235,0.3) 0%, transparent 70%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up':      'fadeUp 0.6s ease-out forwards',
        'fade-in':      'fadeIn 0.8s ease-out forwards',
        'float':        'float 6s ease-in-out infinite',
        'glow':         'glow 2s ease-in-out infinite alternate',
        'slide-left':   'slideLeft 0.5s ease-out forwards',
        'slide-right':  'slideRight 0.5s ease-out forwards',
        'pulse-blue':   'pulseBlue 2s ease-in-out infinite',
        'spin-slow':    'spin 8s linear infinite',
        'bounce-slow':  'bounce 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%':   { boxShadow: '0 0 5px rgba(37,99,235,0.5), 0 0 10px rgba(37,99,235,0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(6,182,212,0.8), 0 0 40px rgba(6,182,212,0.4)' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseBlue: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(37,99,235,0.4)' },
          '50%':      { boxShadow: '0 0 0 15px rgba(37,99,235,0)' },
        },
      },
      boxShadow: {
        'glow-blue': '0 0 30px rgba(37,99,235,0.5)',
        'glow-cyan': '0 0 30px rgba(6,182,212,0.5)',
        'glass':     '0 8px 32px rgba(0,0,0,0.37)',
        'card':      '0 4px 24px rgba(0,0,0,0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
}

export default config
