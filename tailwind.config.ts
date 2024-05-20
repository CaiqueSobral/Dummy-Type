import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        primary: '#323437',
      },
      animation: {
        ping: 'ping 0.5s cubic-bezier(0, 0, 0.5, 0.5) infinite',
      },
    },
  },
  plugins: [],
}
export default config
