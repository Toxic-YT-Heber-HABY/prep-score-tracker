
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
        background: "hsl(var(--background))", 
        foreground: "hsl(var(--foreground))", 
        border: "hsl(var(--border) / 0.1)", 
        input: "hsl(var(--input) / 0.2)", 
        ring: "hsl(var(--ring) / 0.2)", 
        // Education theme colors with expanded palette
        education: {
          primary: "#9b87f5", // Purple color for primary actions
          secondary: "#a798f7", // Lighter purple for secondary elements
          dark: "#7a67d4", // Darker purple for hover states
          light: "#e8e4fc", // Very light purple for backgrounds
          accent: "#6e59a5", // A richer purple for accents
          highlight: "#d6bcfa", // Light lavender for highlights
          muted: "#f1f0fb", // Very soft purple for muted backgrounds
        },
      },
      borderWidth: {
        DEFAULT: '1px', 
      },
      borderRadius: {
        lg: "0.75rem", 
        md: "0.5rem",
        sm: "0.25rem"
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'button': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'button-hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-light': 'pulseLight 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseLight: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
