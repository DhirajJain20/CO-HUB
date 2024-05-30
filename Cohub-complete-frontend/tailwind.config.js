/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        customFont: ["Custom Font", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto Mono", "monospace"],
      },
      colors: {
        teal: "#66FCF1",
        lilac: "#9B9EE0",
      },
    },
  },
  plugins: [],
};
