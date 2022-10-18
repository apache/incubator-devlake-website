/** @type {import('tailwindcss').Config} */

const {tailwindConfig} = require('dev-website-tailwind-config');
module.exports = tailwindConfig;

// pre config
// const defaultTheme = require('tailwindcss/defaultTheme');

// module.exports = {
//   content: ['./src/**/*.{js,jsx,ts,tsx}'],
//   corePlugins: {
//     preflight: false,
//   },
//   theme: {
//     fontFamily: {
//       inter: ['"Inter"', ...defaultTheme.fontFamily.sans],
//     },
//     screens: {
//       'xl': '1280px',
//       'sm': { 'max': '1024px' },
//       'mobile': { 'max': '550px' },
//     },
//     spacing: {
//       1: '8px',
//       2: '12px',
//       3: '16px',
//       4: '24px',
//       5: '32px',
//       6: '48px',
//       7: '64px',
//       8: '80px',
//       9: '96px',
//       10: '112px',
//       11: '128px',
//     },
//     extend: {
//       colors: {
//         primary: '#7497F7',
//         'primary-light': '#99B3F9',
//         'primary-100': '#F0F4FE',
//         'primary-200': '#DBE4FD',
//         'primary-300': '#BDCEFB',
//         'primary-500': '#7497F7',
//         'primary-800': '#3C5088',
//         neutral: {
//           invert: '#FFFFFF',
//           300: '#94959F',
//           400: '#70727F',
//           500: '#4D4E5F',
//           600: '#292B3F',
//         },
//         secondary: {
//           500: "#FF8B8B",
//         }
//       },
//       fontSize: {
//         heading0: ['48px', { lineHeight: '64px' }],
//         heading1: ['32px', { lineHeight: '40px' }],
//         heading2: ['24px', { lineHeight: '30px' }],
//         heading3: ['20px', { lineHeight: '25px' }],
//         heading4: ['16px', { lineHeight: '20px' }],
//         label14: ['14px', { lineHeight: '20px' }],
//         label16: ['16px', { lineHeight: '24px' }],
//         label18: ['18px', { lineHeight: '24px' }],
//         label24: ['24px', { lineHeight: '32px' }],
//         body: ['14px', { lineHeight: 1.214 }],
//         "body-sm": ['12px', { lineHeight: 1.25 },],
//         "body-large": ['24px', { lineHeight: '32px' }],
//       },
//       dropShadow: {
//         xl: ['0px 3.2px 16px rgba(153, 179, 249, 0.1)'],
//       },
//       boxShadow: {
//         sm: '0px 2.4px 4.8px -0.8px rgba(0, 0, 0, 0.2), 0px 1.6px 8px rgba(0, 0, 0, 0.2)',
//         lg: '0px 4.8px 9.6px -0.8px rgba(0, 0, 0, 0.2), 0px 3.2px 16px rgba(0, 0, 0, 0.2)',
//         lower: '0px 1.2px 2.4px -0.8px rgba(0, 0, 0, 0.1), 0px 0.8px 4px rgba(0, 0, 0, 0.07)',
//         high: '0px 9.6px 19.2px -0.8px rgba(0, 0, 0, 0.1), 0px 6.4px 32px rgba(0, 0, 0, 0.07)',
//         card: '0px 20px 64px -0.8px rgba(0, 0, 0, 0.06)',
//         hide: '0px 0px 0px 0px rgba(0, 0, 0, 0)',
//       },
//     },
//   },
//   plugins: [],
// };
