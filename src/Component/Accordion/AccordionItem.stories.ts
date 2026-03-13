import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./accordion-item.twig"
import "./Elements/Accordion"
import "./accordion.css"
import { AccordionItem as AccordionItemType } from "@pnx-mixtape/ids-shape"

/**
 * An HTML Details based accordion.
 * For extra features like anchor opening, include the `Accordion` custom element javascript.
 */
const meta: Meta<AccordionItemType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: "Music",
    content:
      "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
    id: "music-accordion",
    open: false,
  },
  argTypes: {
    title: {
      description: "The accordion title, shown as the toggle",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
    },
    content: {
      description: "Content.",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: { type: { summary: "WysiwygText" } },
    },
    id: {
      description: "The AccordionItem id",
      type: {
        name: "string",
        required: true,
      },
    },
    open: {
      description: "Option to set the accordion as open by default.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
}

export default meta
type Story = StoryObj<AccordionItemType>

export const AccordionItem: Story = {}

/**
 * Open by default accordion.
 */
export const Open: Story = {
  args: {
    open: true,
    id: "open-accordion-item",
  },
}
