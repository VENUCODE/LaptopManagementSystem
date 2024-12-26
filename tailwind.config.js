module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "pattern-light": `linear-gradient(-30deg, rgb(243 244 246) 60%, transparent), url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(3) rotate(180)'><rect x='0' y='0' width='100%' height='100%' fill='%23f8972000'/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='1' stroke='%2302a6f22d' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-174,-300.69)' fill='url(%23a)'/></svg>")`,
        "pattern-dark": `linear-gradient(-30deg, rgb(23, 37, 84) 60%, transparent), url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='29' height='50.115' patternTransform='scale(3) rotate(180)'><rect x='0' y='0' width='100%' height='100%' fill='%23f8972000'/><path d='M14.498 16.858L0 8.488.002-8.257l14.5-8.374L29-8.26l-.002 16.745zm0 50.06L0 58.548l.002-16.745 14.5-8.373L29 41.8l-.002 16.744zM28.996 41.8l-14.498-8.37.002-16.744L29 8.312l14.498 8.37-.002 16.745zm-29 0l-14.498-8.37.002-16.744L0 8.312l14.498 8.37-.002 16.745z'  stroke-width='1' stroke='%2302a6f22d' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-174,-300.69)' fill='url(%23a)'/></svg>")`,
      },
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    function ({ addComponents }) {
      addComponents({
        ".custom-bg": {
          "@apply bg-slate-100 dark:bg-slate-950 text-lg p-4 rounded-md": "",
        },
        ".heading-1": {
          "@apply text-center text-4xl font-bold tracking-tight text-indigo-900 dark:text-indigo-300":
            "",
        },
        ".custom-card": {
          "@apply flex border border-2 dark:border-blue-700 py-4 border-white bg-slate-100 shadow-md bg-opacity-50 dark:bg-blue-950 p-3 rounded-md   justify-center":
            "",
        },
        ".pattern-light": {
          "@apply bg-pattern-light bg-cover bg-no-repeat bg-fixed": "",
          "background-position": "50% -90%",
          transition: "background-color 0.2s, color 0.05s",
        },
        ".pattern-dark": {
          "@apply bg-pattern-dark bg-cover bg-no-repeat bg-fixed": "",
          "background-position": "50% -90%",
          transition: "background-color 0.2s, color 0.05s",
        },
        ".filter-btn": {
          "@apply relative outline outline-slate-100 hover:bg-clip-border dark:text-gray-50   hover:bg-opacity-50  inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 bg-clip-text rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 border-none  transition-all duration-200":
            {},
        },

        ".filter-btn-active": {
          "@apply relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-white rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500  dark:text-white outline-none border-none transition-all duration-200":
            {},
        },
      });
    },
  ],
};
