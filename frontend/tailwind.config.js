/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'amazon-dark': '#131921',
        'amazon-light': '#232f3e',
        'amazon-orange': '#febd69',
        'amazon-yellow': '#ffd814',
        'amazon-yellow-hover': '#f7ca00',
        'amazon-blue': '#007185',
      }
    },
  },
  plugins: [],
}
