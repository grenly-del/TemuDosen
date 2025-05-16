/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["app/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        roboto: 'Roboto',
        'roboto-italic': 'Roboto-Italic'
      },
      colors: {
        primary: '#416FDF',
        borderClr: '#DFDFDF',
        textClr: '#454545'
      }
    },
  },
  plugins: [],
}