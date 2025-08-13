import type { Config } from 'tailwindcss'
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./styles/**/*.css"],
  theme: {
    extend: {
      colors: {
        tea: {
          forest: "#0D3B2E",
          leaf: "#2E7D5B",
          gold: "#C9A227",
          cream: "#FAF7F2"
        },
        netflix: {
          black: "#141414",
          dark: "#1a1a1a", 
          gray: "#2a2a2a",
          lightGray: "#3a3a3a",
          red: "#e50914",
          white: "#ffffff",
          text: "#e5e5e5",
          accent: "#46d369"
        }
      },
      fontFamily: {
        heading: ["Playfair Display", "serif"],
        body: ["Inter", "sans-serif"]
      }
    }
  },
  plugins: []
}
export default config


