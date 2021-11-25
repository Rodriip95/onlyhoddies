module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      principal: ['Bebas Neue', 'cursive'],
    },
    extend: {
      backgroundImage: {
        'login-screen': "url('/src/assets/login.jpg')",
        'register-screen': "url('/src/assets/register.jpg')",
       }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
