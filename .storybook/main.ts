import { StorybookConfig } from "@storybook/html-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  staticDirs: ["./public"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-vitest"],
  framework: "@storybook/html-vite",
}

export default config
