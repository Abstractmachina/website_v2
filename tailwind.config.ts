import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'img-rock-00': "url('/img/rock-00.jpg')",
      },
      fontFamily: {
        'monolisk': ['var(--font-monolisk)'],
        'inter': ['var(--font-inter)', 'sans-serif'],
        'roboto': ['var(--font-roboto)', 'sans-serif'],
        'monument': ['var(--font-monument)', 'sans-serif'],
        'sourceserif': ['var(--font-source-serif)', 'serif']
      },
    },
    fontFamily: {
      sans: ["var(--font-opensans)", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
}
export default config
