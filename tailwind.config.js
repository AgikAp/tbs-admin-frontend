/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-0": "#161B21",
        "dark-1": "#1D232C",
        "dark-3": "#3B4758",
        "dark-4": "#586A84",
        "dark-5": "#7D8FA9",
        "dark-6": "#A9B5C6",
        "light-0": "#FFFFFF",
        "light-1": "#EEF0F4",
        "gray-0": "#586A84",
        "red-0": "#FF316A",
        "green-0": "#10D096",
        "primary-0": "#00284C",
        "primary-1": "#005098",
        "primary-2": "#0077E4",
      }
    },
  },
  plugins: [
    require('daisyui'),
  ],
}