import { defineConfig, loadEnv } from "vite"
import { resolve } from "node:path"
import { globSync } from "node:fs"
import { Features } from "lightningcss"
import postcssGlobalData from "@csstools/postcss-global-data"
import postcssDesignTokens from "postcss-design-tokens"
import postcssCustomMedia from "postcss-custom-media"
import postcssMixins from "postcss-mixins"
import postcssPrependLayer from "postcss-prepend-layer"
import twig from "vite-plugin-twig-drupal"

import tokens from "./src/tokens.js"

const entry = [
  ...globSync(["src/**/*.entry.js", "src/**/*.css"], {
    exclude: ["**/_*.css"],
  }),
  "src/elements.ts",
]

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
      rolldownOptions: {
        output: {
          chunkFileNames: "chunks/[name]-[hash].js",
          minify:
            mode === "development"
              ? false
              : {
                  compress: {
                    dropConsole: true,
                    dropDebugger: true,
                  },
                },
        },
      },
    },
    css: {
      lightningcss: {
        exclude: Features.LightDark | Features.LogicalProperties | Features.Nesting,
      },
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
          postcssCustomMedia(),
          postcssMixins(),
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
