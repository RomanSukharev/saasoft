import primePlugin from "tailwindcss-primeui";

export default {
  content: [
    "App.vue",
    "ui-kit/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
  ],
  theme: {},
  plugins: [primePlugin],
}

