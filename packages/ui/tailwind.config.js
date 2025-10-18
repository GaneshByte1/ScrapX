/****
 * Tailwind config for @repo/ui primitives
 * Apps can import this via `@repo/ui/tailwind-config`
 */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Apps should extend these globs in their own config
    "./src/**/*.{ts,tsx}",
    "../**/src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563eb',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
