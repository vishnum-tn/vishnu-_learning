/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: "#0a1210",
        panel: "#111d19",
        ink: "#E9EDF8",
        accent: "#06b6d4",
        accent2: "#14b8a6"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(6, 182, 212, 0.2), 0 18px 60px rgba(6, 182, 212, 0.35)"
      },
      backgroundImage: {
        "hero-radial": "radial-gradient(1200px circle at 15% 10%, rgba(6, 182, 212, 0.28), transparent 42%), radial-gradient(1200px circle at 85% 20%, rgba(20, 184, 166, 0.22), transparent 38%)"
      }
    }
  },
  plugins: []
};
