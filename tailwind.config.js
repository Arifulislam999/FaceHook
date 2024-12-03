/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        favGreen: "#00D991",
        deepDark: "#17181C",
        mediumDark: "#1E1F24",
        lighterDark: "#27292F",
      },
      backgroundColor: {
        "custom-dark": "rgba(23, 24,28, 0.7)",
        "deep-dark": "rgba(23, 24,28, 0.9)",
        mediumDark: "#27292F",
        slowDark: "#3C3E45",
      },
      zIndex: {
        9999: "9999",
        10000: "10000",
        10001: "10001",
      },
      screens: {
        xxs: "319px",
        xs: "375px",
        mxs: "425px",
        x1440: "1420px",
      },
    },
  },
  plugins: [],
};
// "custom-dark": "rgba(59, 66, 82, 0.9)",
