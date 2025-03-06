/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Override the default sans font
      fontFamily: {
        sans: ['Mosvita', 'sans-serif'],
      },
      // (Optional) also keep a custom alias if needed:
      mosvita: ['Mosvita', 'sans-serif'],
    },
  },
  plugins: [],
};
