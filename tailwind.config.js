/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0a0e27",
        panel: "#111535",
        ink: "#E9EDF8",
        accent: "#60a5fa",
        accent2: "#818cf8"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(96, 165, 250, 0.2), 0 18px 60px rgba(96, 165, 250, 0.35)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(1200px circle at 15% 10%, rgba(96, 165, 250, 0.28), transparent 42%), radial-gradient(1200px circle at 85% 20%, rgba(129, 140, 248, 0.22), transparent 38%)"
      }
    }
  },
  plugins: []
};
