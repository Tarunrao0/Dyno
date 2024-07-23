/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./components/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        oatmilk: "#efede5",
        inkblue: "#0a45a4",
        cocoa: "#848484",
        almond: "#b4b4ac",
        marine: "#8da9cd",
        palesky: "#b8d0e7",
      },
      fontFamily: {
        superWoobly: ["SuperWoobly"],
        superVibes: ["SuperVibes"],
        merchandise: ["Merchandise"],
      },
    },
  },
  plugins: [],
};
