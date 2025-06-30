/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(30, 30, 30)",
        gold: "rgb(201, 170, 113)",
      },
      borderColor: {
        primary: "rgb(82, 82, 82)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".text-shadow-lg": {
            textShadow: "0 0 5px #000, 0 5px 5px #000",
          },
          ".mob-shadow": {
            boxShadow: "0 0 10px 0 black",
          },
        },
        ["responsive"]
      );
    },
  ],
};
