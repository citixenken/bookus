/** @type {import('tailwindcss').Config} */
module.exports = {
  // content: ["./src/**/*.{html,js,jsx,cjs}"],
  content: ["./**/*.{html,js,jsx,cjs, ts, tsx}"],
  theme: {
    // screen breakpoints
    screens: { sm: "640px", md: "768px", lg: "976px", xl: "1440px" },
    extend: {
      // custom colors
      colors: {
        brightRed: "hsl(12, 88%, 59%)",
        brightRedLight: "hsl(12, 88%, 69%)",
        brightRedSupLight: "hsl(12, 88%, 95%)",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryDarkBlue: "hsl(233, 12%, 13%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        veryLightGray: "hsl(0, 0%, 98%)",
      },
      fontFamily: {
        Rokkitt: "Rokkitt",
      },
    },
  },
  plugins: [],
};
