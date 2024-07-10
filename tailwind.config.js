/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'slide-image': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/assets/images/slide.jpg')"
      },
      backgroundPosition: {
        'center-top': "center top"
      },
      colors: {},
      screens: {
        xs: "400px"
      }
    }
  },
  plugins: []
};
