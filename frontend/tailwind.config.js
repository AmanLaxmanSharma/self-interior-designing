/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-ivory': '#F5F0E6',
        'soft-beige': '#E8DDCC',
        'warm-taupe': '#B9A895',
        'muted-sage': '#9BAA91',
        'deep-olive': '#3F5036',
        'charcoal': '#292A26',
        'pure-white': '#FFFFFF',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'luxury': '0 20px 40px -15px rgba(41, 42, 38, 0.07)',
        'card-hover': '0 30px 60px -12px rgba(63, 80, 54, 0.12)',
        'modal': '0 25px 50px -12px rgba(41, 42, 38, 0.25)',
      }
    },
  },
  plugins: [],
}
