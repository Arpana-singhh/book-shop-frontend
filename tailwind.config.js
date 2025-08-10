/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-gradient': 'linear-gradient(78.83deg, #FFE6E6 -2.75%, #F5FFFE 20.07%, #FFFFFF 54.28%, #FFFFFF 101.59%)',
      },
      colors: {
        primary: '#393280', 
        secondary:'#ED553B'
      },
    },
  },
  plugins: [],
}


