// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        svnCookies: ["SVN-Cookies"],
        sourceSansPro: ["Source Sans 3"],
      },
      colors: {
        customOrange: {
          superLight: "#ffdb58",
          light: "#f38c23",
          hard: "#ff924d",
        },
      },
      lineHeight: {
        "extra-loose": "2.5",
        12: "3rem",
      },
      backgroundImage: {
        TheoO1: "url('/src/assets/images/background/TheoO_Background.webp')",
        TheoO2: "url('/src/assets/images/background/TheoO2.webp')",
        TheoO3: "url('/src/assets/images/background/TheoO3.webp')",
      },
      width: {
        customSvg: "32px",
      },
      height: {
        customSvg: "32px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
