
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
        border: "hsl(var(--border) / 0.1)", // Softer border color
        input: "hsl(var(--input) / 0.2)", // Lighter input border
        ring: "hsl(var(--ring) / 0.2)", // Softer ring color
      },
      borderWidth: {
        DEFAULT: '1px', // Thinner default border
      },
      borderRadius: {
        lg: "0.75rem", // Softer rounded corners
        md: "0.5rem",
        sm: "0.25rem"
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
