const defaultTheme = require('tailwindcss/defaultTheme');
const fluid = require('fluid-tailwind');
const containerQueries = require('@tailwindcss/container-queries');

const fluidExtractor = fluid.extract();

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    extract: {
      DEFAULT: fluidExtractor,
      astro: fluidExtractor,
      html: fluidExtractor,
      js: fluidExtractor,
      jsx: fluidExtractor,
      ts: fluidExtractor,
      tsx: fluidExtractor,
    },
  },
  theme: {
    screens: fluid.screens,
    fontSize: fluid.fontSize,
    extend: {
      colors: {
        site: {
          background: '#335c67',
          link: '#f9c594',
          text: '#f5f1e3',
        },
      },
      fontFamily: {
        body: ['Heebo', ...defaultTheme.fontFamily.sans],
        display: ['Staatliches', ...defaultTheme.fontFamily.sans],
        heading: ['Rubik', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    fluid.default,
    containerQueries,
  ],
};
