/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        border: "#e5e7eb",
        input: "#ffffff",
        ring: "#d4af37",
        background: "#ffffff",
        foreground: "#001a4d",
        'royal-blue': {
          DEFAULT: "#001a4d",
          light: "#0033a0",
          lighter: "#004db8",
        },
        'gold': {
          50: "#fefdf8",
          100: "#fdf6e3",
          200: "#f9e8b8",
          300: "#f4d488",
          400: "#edbf47",
          500: "#d4af37",
          600: "#b8941f",
          700: "#9c7c1a",
          800: "#7d631c",
          900: "#6b531c",
          DEFAULT: "#d4af37",
        },
        primary: {
          DEFAULT: "#d4af37", // gold
          foreground: "#001a4d",
        },
        secondary: {
          DEFAULT: "#001a4d", // royal blue
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#f9fafb",
          foreground: "#6b7280",
        },
        accent: {
          DEFAULT: "#d4af37", // gold
          foreground: "#001a4d",
        },
        popover: {
          DEFAULT: "#ffffff",
          foreground: "#001a4d",
        },
        card: {
          DEFAULT: "#ffffff",
          foreground: "#001a4d",
        },
        success: {
          DEFAULT: "#16a34a",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#d97706",
          foreground: "#ffffff",
        },
        error: {
          DEFAULT: "#dc2626",
          foreground: "#ffffff",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Crimson Text', 'serif'],
        sans: ['Poppins', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        caption: ['Poppins', 'sans-serif'],
        data: ['JetBrains Mono', 'monospace'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeInUp": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slideInLeft": {
          "0%": { opacity: "0", transform: "translateX(-40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slideInRight": {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-gold": {
          "0%, 100%": { "box-shadow": "0 0 0 0 rgba(212, 175, 55, 0.7)" },
          "50%": { "box-shadow": "0 0 0 10px rgba(212, 175, 55, 0)" },
        },
        "shimmer": {
          "0%": { "background-position": "-1000px 0" },
          "100%": { "background-position": "1000px 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fadeInUp": "fadeInUp 0.6s ease-out",
        "slideInLeft": "slideInLeft 0.6s ease-out",
        "slideInRight": "slideInRight 0.6s ease-out",
        "pulse-gold": "pulse-gold 2s infinite",
        "shimmer": "shimmer 2s infinite",
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      boxShadow: {
        'gold': '0 1px 3px rgba(212, 175, 55, 0.1)',
        'gold-md': '0 4px 6px rgba(212, 175, 55, 0.1), 0 2px 4px rgba(212, 175, 55, 0.06)',
        'gold-lg': '0 10px 15px rgba(212, 175, 55, 0.1), 0 4px 6px rgba(212, 175, 55, 0.05)',
        'gold-xl': '0 20px 25px rgba(212, 175, 55, 0.1), 0 10px 10px rgba(212, 175, 55, 0.04)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}