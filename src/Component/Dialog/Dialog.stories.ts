import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./dialog.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./Elements/Dialog"
import "./dialog.css"
import "../Card/card.css"
import { Heading as HeadingType, HeadingTypes, WysiwygText } from "@pnx-mixtape/ids-shape"

export type Dialog = {
  title?: HeadingType
  content: WysiwygText
  dialogTitle: HeadingType
  dialogContent: WysiwygText
  state?: boolean
  id?: string
  toggleText?: string
}

const meta: Meta<Dialog> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "Closed state 'Dialog card' element title",
      as: HeadingTypes.TWO,
    }),
    dialogTitle: Heading({
      title: "This is the open Custom 'Dialog' Element title",
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
      description: "Add text for the initial Dialog card",
      control: "text",
    },
    dialogTitle: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the Dialog.",
      control: "text",
    },
    dialogContent: {
      description: "Add text for the dialog 1",
      control: "text",
    },
  },
}

export default meta
type Story = StoryObj<Dialog>

export const Dialog: Story = {
  args: {
    content: "This is the default story content text inside the dialog card part 1",
    dialogContent: "This is the default story content text inside the dialog part 2",
  },
}

export const DefaultOpen: Story = {
  args: {
    ...meta.args,
    state: true,
  },
}
