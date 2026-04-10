/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  presets: [require("nativewind/preset")], // ✅ THIS LINE FIXES YOUR ERROR
  theme: {
    extend: {},
  },
  plugins: [],
};
