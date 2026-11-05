/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#651D32',
          dark: '#4B1424',
          light: '#7F2742',
        },
        maroon: {
          DEFAULT: '#7B263C',
          dark: '#5C1C2D',
          light: '#94314A',
        },
        ivory: {
          DEFAULT: '#FFF9F0',
          dark: '#F5ECDE',
          light: '#FFFFFF',
        },
        gold: {
          DEFAULT: '#C6A15B',
          dark: '#A68442',
          light: '#DEBE7E',
          shimmer: '#E5C583',
        },
        champagne: {
          DEFAULT: '#E8D7B7',
          dark: '#D5BE95',
          light: '#F4EADA',
        },
        charcoal: {
          DEFAULT: '#252322',
          dark: '#161514',
          light: '#3C3937',
        },
        beige: {
          DEFAULT: '#F3EBDD',
          dark: '#E4D8C4',
          light: '#FAF6EE',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', 'Baskerville', 'serif'],
        sans: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #DEBE7E 0%, #C6A15B 50%, #A68442 100%)',
        'burgundy-gradient': 'linear-gradient(135deg, #7B263C 0%, #651D32 60%, #4B1424 100%)',
        'ivory-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #FFF9F0 100%)',
        'dark-luxury': 'linear-gradient(145deg, #2D111A 0%, #1A0A10 100%)',
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(101, 29, 50, 0.12)',
        'luxury-lg': '0 25px 50px -12px rgba(101, 29, 50, 0.2)',
        'gold': '0 10px 25px -5px rgba(198, 161, 91, 0.3)',
      },
    },
  },
  plugins: [],
}

