/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#020306',
          900: '#050811',
          850: '#0B0F1C',
          800: '#111728',
          700: '#1A2238',
        },
        cyan: {
          glow: '#00F0FF',
          neon: '#38BDF8',
          ice: '#7DD3FC',
          dim: 'rgba(0, 240, 255, 0.15)',
        },
        hazard: {
          red: '#F43F5E',
          amber: '#F59E0B',
          coral: '#FB7185',
          emerald: '#10B981',
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Space Grotesk"', 'sans-serif'],
        sans: ['"Instrument Sans"', '"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', '"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 38s linear infinite',
        'spin-reverse': 'spinReverse 46s linear infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'float-subtle': 'floatSubtle 6s ease-in-out infinite',
        'orbit-slow': 'orbitSweep 24s linear infinite',
      },
      keyframes: {
        spinReverse: {
          '0%': { transform: 'rotate(360deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.85', transform: 'scale(1)' },
          '50%': { opacity: '0.4', transform: 'scale(1.05)' },
        },
        floatSubtle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        orbitSweep: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
};
