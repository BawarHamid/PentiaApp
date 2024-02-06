/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-bgcolor": "#F0F4F3",
        "primary-darkbg": "#1B202D",
        "primary-lightbg": "#292F3F",
        "primary-cyan": "#50C2C9",
        "primary-red": "#FF385C",
        "primary-grey": "#5E5D5E",
        "primary-blue": "#455CC6",
        "primary-medium-black": "#222222",
        "primary-yellow": "#FFC409",
        "primary-black": "#000000",
        "primary-white": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
