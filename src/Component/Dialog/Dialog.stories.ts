import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./dialog.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./Elements/Dialog"
import "./dialog.css"
import { Heading as HeadingType, HeadingTypes, WysiwygText } from "@pnx-mixtape/ids-shape"

export type Dialog = {
  title?: HeadingType
  content: WysiwygText
  state?: boolean
  id?: string
}

const meta: Meta<Dialog> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "This is a HTML Dialog Element",
      as: HeadingTypes.TWO,
    }),
  },
  argTypes: {
    title: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the Dialog.",
      control: "text",
    },
    content: {
      description: "Add text for the dialog 1",
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<Dialog>

export const Dialog: Story = {
  args: {
    content: "hi there",
  },
}

export const DefaultOpen: Story = {
  args: {
    ...meta.args,
    state: true,
    content: "This is the default story content text 2",
  },
}
