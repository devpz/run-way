import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#37abe2",
        customOrange: "#ff3130",
        headerCustomColor: "#0e1316",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    themes: [
      {
        customLight: {
          primary: "#057AFF",
          secondary: "#000080",
          accent: "#ff3131",
          neutral: "#0f172b",
          "base-100": "#ffffff",
        },
        customDark: {
          primary: "#057AFF",
          secondary: "#f8855b",
          accent: "#ff3131",
          neutral: "#1c262b",
          "base-100": "#1c262c",
        },
      },
    ],
  },
};

export default config;
