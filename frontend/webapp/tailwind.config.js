/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand and UI
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        bg: 'rgb(var(--color-bg) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        hover: 'rgb(var(--color-hover) / <alpha-value>)',
        active: 'rgb(var(--color-active) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        success: 'rgb(var(--color-success) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        inputbg: 'rgb(var(--color-input-bg) / <alpha-value>)',
        inputborder: 'rgb(var(--color-input-border) / <alpha-value>)',
        scrollbar: 'rgb(var(--color-scrollbar) / <alpha-value>)',
        // Text roles (consistent naming)
        'text-title': 'rgb(var(--text-title) / <alpha-value>)',
        'text-date': 'rgb(var(--text-date) / <alpha-value>)',
        'text-emailsender': 'rgb(var(--text-emailsender) / <alpha-value>)',
        'text-main': 'rgb(var(--text-main) / <alpha-value>)',
        'text-secondary': 'rgb(var(--text-secondary) / <alpha-value>)',
        'text-muted': 'rgb(var(--text-muted) / <alpha-value>)',
      },
      fontFamily: {
        main: ['var(--font-main)'],
      },
    },
  },
  plugins: [],
};
