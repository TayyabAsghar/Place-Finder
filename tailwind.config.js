/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      ms: "360px",
      mm: "400px",
      ml: "580px",
      tab: "780px",
      lap: "1023px",
      pc: "1440px"
    },
    extend: {
      backgroundImage: {
        'slide-image': "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/public/assets/images/slide.jpg')"
      },
      backgroundPosition: {
        'center-top': "center top"
      },
      colors: {
        border: "rgba(0, 0, 0, 0.23)",
        background: "#F3F7F6",
        foreground: "#0C1210",
        primary: {
          DEFAULT: "#6D9E8D",
          50: 'hsl(156, 20%, 95%)',
          100: 'hsl(158, 22%, 90%)',
          200: 'hsl(159, 20%, 80%)',
          300: 'hsl(159, 20%, 70%)',
          400: 'hsl(159, 20%, 60%)',
          500: 'hsl(159, 20%, 50%)',
          600: 'hsl(159, 20%, 40%)',
          700: 'hsl(159, 20%, 30%)',
          800: 'hsl(159, 20%, 20%)',
          900: 'hsl(158, 22%, 10%)',
          950: 'hsl(168, 20%, 5%)'
        },
        secondary: {
          DEFAULT: "#B5ACC8",
          50: 'hsl(252, 20%, 95%)',
          100: 'hsl(262, 22%, 90%)',
          200: 'hsl(258, 20%, 80%)',
          300: 'hsl(259, 20%, 70%)',
          400: 'hsl(259, 20%, 60%)',
          500: 'hsl(259, 20%, 50%)',
          600: 'hsl(260, 20%, 40%)',
          700: 'hsl(259, 20%, 30%)',
          800: 'hsl(258, 20%, 20%)',
          900: 'hsl(262, 22%, 10%)',
          950: 'hsl(264, 20%, 5%)'
        },
        accent: {
          DEFAULT: "#AC86AF",
          50: 'hsl(288, 20%, 95%)',
          100: 'hsl(295, 22%, 90%)',
          200: 'hsl(297, 20%, 80%)',
          300: 'hsl(296, 20%, 70%)',
          400: 'hsl(297, 20%, 60%)',
          500: 'hsl(296, 20%, 50%)',
          600: 'hsl(297, 20%, 40%)',
          700: 'hsl(296, 20%, 30%)',
          800: 'hsl(297, 20%, 20%)',
          900: 'hsl(295, 22%, 10%)',
          950: 'hsl(300, 20%, 5%)'
        },
        error: "#D32F2F"
      },
      screens: {
        xs: "400px"
      }
    }
  },
  plugins: []
};
