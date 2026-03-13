import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig, mergeConfig, configDefaults } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import viteConfig from "./vite.config"

const __dirname = dirname(fileURLToPath(import.meta.url))

const sharedConfig = {
  // Enable browser mode
  browser: {
    enabled: true,
    // Make sure to install Playwright
    provider: playwright({}),
    headless: true,
    instances: [{ browser: "chromium" }],
  },
  exclude: [...configDefaults.exclude, "scripts"],
}

export default defineConfig(configEnv =>
  mergeConfig(
    viteConfig(configEnv),
    defineConfig({
      test: {
        projects: [
          {
            extends: true,
            plugins: [
              storybookTest({
                // The location of your Storybook config, main.js|ts
                configDir: join(__dirname, ".storybook"),
                // This should match your package.json script to run Storybook
                // The --no-open flag will skip the automatic opening of a browser
                storybookScript: "pnpm dev-html --no-open",
                tags: {
                  exclude: ["no-snapshot"],
                },
              }),
            ],
            test: {
              name: "storybook",
              setupFiles: ["./.storybook/vitest.setup.ts"],
              ...sharedConfig,
            },
          },
        ],
      },
    }),
  ),
)
