/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#fe006f",
        dark: "#121212",
        semi: "#212121",
        light: "#474747"
      },
      keyframes: {
        slide: {
          "0%": { transform: "top:-100%" },
          "100%": { transform: "none" }
        }
      },
      animation: {
        slide: "slide 1.5s ease-in forward"
      }
    },
  },
  plugins: [require('daisyui')],
}

