import next from 'next'
import tailwind from 'eslint-plugin-tailwindcss'

/** @type {import('eslint').Linter.Config} */
const config = {
  plugins: {
    tailwindcss: tailwind,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'next',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    '@next/next/no-html-link-for-pages': 'off',
  },
}

export default config
