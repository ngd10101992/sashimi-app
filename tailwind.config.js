const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            animation: {
              fade: 'fadeIn 0.3s ease-in-out',
            },
            keyframes: {
              fadeIn: {
                '0%': { opacity: 0 },
                '100%': { transform: 1 },
              }
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],

    darkMode: 'class',
};
