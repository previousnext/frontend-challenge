import { defineConfig, loadEnv } from "vite"
import { resolve } from "node:path"
import { globSync } from "node:fs"
import postcssGlobalData from "@csstools/postcss-global-data"
import postcssDesignTokens from "postcss-design-tokens"
import postcssPresetEnv from "postcss-preset-env"
import postcssPxToRem from "postcss-pxtorem"
import postcssMixins from "postcss-mixins"
import postcssInlineSvg from "postcss-inline-svg"
import postcssPrependLayer from "postcss-prepend-layer"
import twig from "vite-plugin-twig-drupal"
import tokens from "./src/tokens.js"

const entry = globSync(["src/**/*.entry.js", "src/**/*.css"], {
  exclude: ["**/_*.css"],
})

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "")
  return {
    define: { "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV) },
    build: {
      lib: {
        entry,
        formats: ["es"],
      },
      cssCodeSplit: true,
      outDir: resolve(import.meta.dirname, "./dist/build"),
      minify: mode === "production",
      cssMinify: "esbuild",
      sourcemap: mode === "development",
      rolldownOptions: {
        output: {
          chunkFileNames: "chunks/[name]-[hash].js",
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          postcssPrependLayer({
            layers: [
              "popover-polyfill",
              "design-system.defaults",
              "design-system.atoms",
              "design-system.layout",
              "design-system.utilities",
              "design-system.components",
            ],
          }),
          postcssDesignTokens({ tokens }),
          postcssGlobalData({
            files: ["./src/_custom-media.css"],
          }),
          postcssMixins(),
          postcssInlineSvg(),
          postcssPresetEnv({
            stage: 0,
            features: {
              "focus-visible-pseudo-class": false,
              "logical-properties-and-values": false,
              "cascade-layers": false,
              "is-pseudo-class": false,
              "lab-function": false,
              "light-dark-function": false,
            },
          }),
          postcssPxToRem({
            propList: [
              "font",
              "font-size",
              "line-height",
              "letter-spacing",
              "margin",
              "margin-block-start",
              "margin-block-end",
              "margin-inline-start",
              "margin-inline-end",
              "padding",
              "padding-block-start",
              "padding-block-end",
              "padding-inline-start",
              "padding-inline-end",
              "height",
              "width",
              "--*",
              "!--base-font-size",
            ],
            unitPrecision: 4,
          }),
        ],
        map: mode === "development",
      },
    },
    plugins: [
      twig({
        namespaces: {
          mixtape: resolve(import.meta.dirname, "./src"),
        },
      }),
    ],
    optimizeDeps: {
      include: ["twig", "drupal-twig-extensions/twig"],
    },
  }
})
