import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./heading.twig"
import "../_base.css"
import { Heading as HeadingType, HeadingTypes } from "@pnx-mixtape/ids-shape"

/**
 * Heading element should always follow correct html heading order. The modifier class can be used to visually change the size when needed.
 */
const meta: Meta<HeadingType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    as: HeadingTypes.TWO,
    title: "Heading",
  },
  argTypes: {
    as: {
      description: "The semantic heading level.",
      options: Object.values(HeadingTypes),
      control: "select",
      table: {
        defaultValue: { summary: HeadingTypes.TWO },
        type: { summary: "enum" },
      },
    },
    modifiers: {
      description: "The visual heading size (only one applies)",
      // @todo add mixtapes heading modifiers.
      options: Object.values(HeadingTypes),
      control: "multi-select",
      table: {
        type: { summary: "enum" },
      },
    },
    title: {
      description: "The heading text",
      type: "string",
    },
    excluded: {
      description:
        "Mark the heading as 'excluded' to remove it from certain javascript contexts (like [InPageNavigation](/?path=/docs/component-inpagenavigation--docs))",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    srOnly: {
      description:
        "Mark the heading as visually hidden so that it's only available for screen reader context.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
}

export default meta
type Story = StoryObj<HeadingType>

export const Headings: Story = {}

/**
 * The modifier class can be used to visually change the size when needed.
 */
export const Resized: Story = {
  args: {
    modifiers: [HeadingTypes.FOUR],
  },
}
