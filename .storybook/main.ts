import { StorybookConfig } from "@storybook/html-vite"

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.ts"],
  staticDirs: ["./public"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs", "@storybook/addon-vitest"],
  framework: "@storybook/html-vite",
  async viteFinal(viteConfig) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite")
    return mergeConfig(viteConfig, {
      // Add dependencies to pre-optimization
      cacheDir: "node_modules/.vite-storybook",
      build: {
        cssMinify: "esbuild",
      },
    })
  },
}

export default config
