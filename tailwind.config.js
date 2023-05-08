/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sidebar-mobile":
          "url('https://raw.githubusercontent.com/dogankocadayilar/multi-step-form/main/src/assets/images/bg-sidebar-mobile.svg')",
        "sidebar-desktop":
          "url('https://raw.githubusercontent.com/dogankocadayilar/multi-step-form/main/src/assets/images/bg-sidebar-desktop.svg')",
      },
    },
  },
  plugins: [],
};
