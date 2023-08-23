/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = {
  theme: {
    extend: {
      boxShadow: {
        'custom': '0 0 10px #ffffffb2, 0 0 15px #ffffff53, 0 0 20px #ffffff78, 0 0 25px #ffffff82, 0 0 30px #ffffff84',
      },
    },
  },
}