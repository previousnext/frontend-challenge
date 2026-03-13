import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./callout.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./callout.css"
import { Callout as CalloutType, HeadingTypes } from "@pnx-mixtape/ids-shape"

const meta: Meta<CalloutType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "Callout heading",
      as: HeadingTypes.TWO,
    }),
    content: "<p>Some callout content.</p>",
  },
  argTypes: {
    title: {
      description: "Optional [Heading](/?path=/docs/atom-heading--docs).",
      control: "text",
      table: {
        type: { summary: "Heading" },
      },
    },
    content: {
      description: "Content.",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "WysiwygText" },
      },
    },
  },
}

export default meta
type Story = StoryObj<CalloutType>

export const Callout: Story = {}
