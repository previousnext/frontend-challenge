import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./text-style.twig"
import ExampleComponent from "./text-styles-example.twig"
import "../_base.css"
import { TextStyles } from "../../enums"

enum TextAlign {
  LEFT = "mx-text--left",
  RIGHT = "mx-text--right",
  CENTER = "mx-text--center",
}

type TextProps = {
  modifier?: TextStyles
  alignment?: TextAlign
  content: string
}

/**
 * Demonstration of the text helper classes that are available to control typographic sizes.
 */
const meta: Meta<TextProps> = {
  tags: ["autodocs"],
  component: Component,
  args: {
    content:
      "In publishing and graphic design, lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document without relying on meaningful content (also called greeking). Replacing the actual content with placeholder text allows designers to design the form of the content before the content itself has been produced.",
  },
  argTypes: {
    modifier: {
      description: "Set the size of the text",
      options: Object.values(TextStyles),
      control: "select",
      table: {
        type: { summary: "enum" },
      },
    },
    alignment: {
      description: "Set the alignment of the text",
      options: Object.values(TextAlign),
      control: "select",
      table: {
        type: { summary: "enum" },
      },
    },
  },
}

export default meta
type Story = StoryObj<TextProps>

export const Text: Story = {}

export const Center: Story = {
  args: {
    alignment: TextAlign.CENTER,
  },
}

export const Example: Story = {
  render: args => `<div class="mx-rich-text mx-vertical-flow">${ExampleComponent(args)}</div>`,
}
