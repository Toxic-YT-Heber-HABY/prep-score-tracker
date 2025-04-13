
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background))", // Add this line
        foreground: "hsl(var(--foreground))", // Add this line
        border: "hsl(var(--border) / 0.1)", 
        input: "hsl(var(--input) / 0.2)", 
        ring: "hsl(var(--ring) / 0.2)", 
      },
      borderWidth: {
        DEFAULT: '1px', 
      },
      borderRadius: {
        lg: "0.75rem", 
        md: "0.5rem",
        sm: "0.25rem"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
