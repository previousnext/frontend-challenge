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
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    dialogContent:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    state: false,
  },
  argTypes: {
    title: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the Dialog.",
      control: "text",
    },
    content: {
      description: "Content.",
      control: "text",
      type: {
        name: "string",
      },
    },
    dialogTitle: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the Dialog.",
      control: "text",
    },
    dialogContent: {
      description: "Content.",
      control: "text",
      type: {
        name: "string",
      },
    },
    state: {
      description: "Dialog open or closed",
      control: "boolean",
      table: {
        defaultValue: { summary: "closed" },
      },
    },
  },
}

export default meta
type Story = StoryObj<Dialog>

export const Dialog: Story = {
  args: {
    content:
      "<p>This is the default story content text inside the dialog card part 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    dialogContent:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Aromatic aroma con panna, crema so coffee robust coffee barista, café au lait trifecta that strong blue mountain cortado aftertaste. Aroma extraction french press, skinny sweet, blue mountain cup roast barista, beans, extra cappuccino mug crema strong. Americano caffeine white, con panna saucer sit, con panna eu, carajillo aftertaste kopi-luwak, body aftertaste cup single origin café au lait saucer</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
  },
}

/**
 * Open by default dialog.
 */
export const StateOpen: Story = {
  args: {
    ...meta.args,
    state: true,
    id: "open-dialog",
  },
}
