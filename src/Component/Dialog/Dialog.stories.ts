import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./dialog.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./Elements/Dialog"
import "./dialog.css"
import { Heading as HeadingType, HeadingTypes, WysiwygText } from "@pnx-mixtape/ids-shape"

export type Dialog = {
  title?: HeadingType
  toggleAll?: boolean
  content: WysiwygText
  open?: boolean
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
    content: "This is the default story content text",
  },
  argTypes: {
    title: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the Dialog.",
      control: "text",
    },
    content: {
      description: "Add text for the dialog",
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<Dialog>

export const Dialog: Story = {}

export const DefaultOpen: Story = {
  args: {
    ...meta.args,
    content: "This is the default story content text",
  },
}

export const ToggleAll: Story = {
  args: {
    toggleAll: true,
  },
}
