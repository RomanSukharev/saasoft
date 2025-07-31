import primePlugin from "tailwindcss-primeui";

export default {
  content: [
    "App.vue",
    "ui-kit/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "pages/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "shared/**/*.{vue,js,jsx,mjs,ts,tsx}",
    "widgets/**/*.{vue,js,jsx,mjs,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        pads: "1250px",
        mobile: "500px",
      },
      animation: {
        slidein: "slidein 0.4s ease-out",
        slideout: "slideout 0.4s ease-in",
      },
      keyframes: {
        slidein: {
          '0%': { transform: 'translateY(100vh)' },
          '100%': { transform: 'translateY(0%)' },
        },
        slideout: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        header: "0px 2px 0px 0px rgba(0, 0, 0, 0.15);",
      },
      fontFamily: {
        sans: ["Hauora", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        surface: "#F5F5F5",
        black: "#141414",
        gray: "#878D96",
        white: "#FFFFFF",
        violet: "#C190FF",
      },
      space: {
        sm: "1.25rem",
        lg: "2.5rem",
        desktop: "90rem",
      },
      padding: {
        "60": "3.75rem",
      },
      maxWidth: {
        "220": "13.75rem",
        "342": "21.375rem",
        "950": "56.25rem",
      },
      maxHeight: {
        "585": "36.5625rem",
        "300": "18.75rem",
      },
      width: {
        "342": "21.375rem",
      },
      fontSize: {
        "32": "2rem",
        "24": "1.5rem",
        "20": "1.25rem",
        "16": "1rem",
        "12": "0.75rem",
      },
      borderRadius: {
        "20": "1.25rem",
        "40": "2.5rem",
      },
    },
    lineHeight: {
      '90': '0.9',
      "100": "1.0",
      "120": "1.2",
    },
  },
  plugins: [primePlugin],
}

