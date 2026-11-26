import { join } from "node:path"
import { defineConfig, mergeConfig, configDefaults } from "vitest/config"
import { playwright } from "@vitest/browser-playwright"
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin"
import viteConfig from "./vite.config.ts"

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
                configDir: join(import.meta.dirname, ".storybook"),
                storybookScript: "pnpm start",
                tags: {
                  exclude: ["no-snapshot"],
                },
              }),
            ],
            test: {
              name: "storybook",
              setupFiles: ["./.storybook/vitest.setup.ts"],
              browser: {
                enabled: true,
                provider: playwright({}),
                headless: true,
                instances: [{ browser: "chromium" }],
              },
              exclude: [...configDefaults.exclude, "scripts"],
            },
          },
        ],
      },
    }),
  ),
)
