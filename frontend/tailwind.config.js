/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
        roboto: ["Roboto", "serif"],
        montserrat: ["Montserrat", "serif"],
        ptsans: ["PT Sans", "serif"]
      }
    },
  },
  plugins: [],
}

