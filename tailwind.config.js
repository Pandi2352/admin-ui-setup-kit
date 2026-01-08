/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5", // Indigo 600
        secondary: "#64748B",
        sidebar: {
          bg: "#ffffff",
          hover: "#F3F4F6",
          active: "#EEF2FF",
          text: "#1F2937",
          textActive: "#4F46E5",
          border: "#E5E7EB"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
