/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 20px 40px -15px rgba(99, 102, 241, 0.05), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'glass-hover': '0 24px 48px -12px rgba(99, 102, 241, 0.08), 0 2px 6px 0 rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        mesh: {
          '0%, 100%': { transform: 'scale(1) translate(0px, 0px)' },
          '50%': { transform: 'scale(1.05) translate(10px, -10px)' },
        },
      },
      animation: {
        'mesh-glow': 'mesh 12s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
