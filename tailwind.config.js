/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      fontFamily: {},
      colors: {
        transparent: 'transparent',
        // base: '',
        'base-100': '#282A36', // Base color of page, used for blank backgrounds
        'base-200': '#242631', // Base color, a little darker
        'base-300': '#20222C', // Base color, even more darker
        'base-content': '#F8F8F2', // Foreground content color to use on base color
        primary: '#FF79C6',
        'primary-focus': '#FF2EA6',
        'primary-content': '#4B002B',
        secondary: '#BD93F9',
        'secondary-focus': '#8F48F5',
        'secondary-content': '#21004F',
        // accent: '',
        // 'accent-focus': '',
        // 'accent-content': '',
        neutral: '#414558',
        'neutral-focus': '#343746',
        'neutral-content': '#C2CBF5',
        // success: colors.green,
        // warning: colors.yellow,
        // error: colors.red,
        // info: colors.blue,
      }
    }
  },
  plugins: []
}
