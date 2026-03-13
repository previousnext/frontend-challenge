import { Preview } from "@storybook/html-vite"
import "./storybook.css"
import "../src/_custom-media.css"
import "../src/constants.css"
import "../src/Atom/base.css"
import "../src/Utility/utilities.css"
import "../src/Layout/Section/section.css"
import "../src/Layout/Grid/grid.css"
import "../src/Layout/Page/page.css"
import "../src/Atom/Icon/icon.css"
import "../src/Atom/Button/button.css"
import "../src/Form/form.css"
import { Page } from "./decorators"

const preview: Preview = {
  decorators: [Page],
  parameters: {
    a11y: {
      options: {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa"],
        },
        resultTypes: ["violations"],
      },
      test: "error",
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Introduction", "Base", "Atom", "Layout", "Form", "Component", "*"],
      },
    },
    useBg: false,
  },
  globalTypes: {
    background: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        dynamicTitle: true,
        icon: "circlehollow",
        items: [
          "default",
          "mx-background--reverse",
          "mx-background--alt",
          "mx-background--primary",
          "mx-background--accent",
        ],
      },
    },
  },
  initialGlobals: {
    background: "default",
  },
}

export default preview
