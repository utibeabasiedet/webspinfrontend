import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
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
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'hero-pattern': "url('../public/banner-bg.png')",
        'footer-texture': "url('/img/footer-texture.png')",
        'frame1': "url('../public/Frame.png')",
        'real-g':"url('../public/spinwell.jpg')",
        'linear-gradient-button': 'linear-gradient(45deg, #043570, #FA4C29)',
        'radial-gradient-bg': 'radial-gradient(circle, #021E35, #F8B214)',
      
        'custom-gradient': 'linear-gradient(135deg, #9DD3F1 0%, #9986C9 50%, #CDB4D9 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config