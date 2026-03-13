/* eslint-disable @typescript-eslint/no-base-to-string, @typescript-eslint/restrict-template-expressions */
import { Decorator } from "@storybook/html-vite"

export const Page: Decorator = (story, { globals }) => {
  const { background } = globals
  return `<div class="mx-page ${background}" data-testid="page">${story()}</div>`
}
