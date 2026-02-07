/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E11D48',
          dark: '#BE123C',
          light: '#FB7185',
        },
        secondary: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          variant: '#F8FAFC',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px -10px rgba(225, 29, 72, 0.15)',
        'glass': '0 8px 32px 0 rgba(15, 23, 42, 0.1)',
      },
      backgroundImage: {
        'gradient-premium': 'linear-gradient(135deg, #E11D48 0%, #BE123C 100%)',
        'gradient-soft': 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
      }
    },
  },
  plugins: [],
}
