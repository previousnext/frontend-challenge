import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./accordion.twig"
import AccordionItem from "./accordion-item.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./Elements/Accordion"
import "./Elements/AccordionGroup"
import "./accordion.css"
import { Accordion as AccordionType, HeadingTypes } from "@pnx-mixtape/ids-shape"

const meta: Meta<AccordionType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "Accordion group",
      as: HeadingTypes.TWO,
    }),
    items: [
      AccordionItem({
        title: "Music",
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
      AccordionItem({
        title: "Performances",
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
    ],
  },
  argTypes: {
    toggleAll: {
      control: "boolean",
      description: "Include the **Expand all / Collapse all** behaviour.",
      table: { defaultValue: { summary: "false" } },
      type: "boolean",
    },
    title: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the accordions.",
      control: "text",
    },
    items: {
      description:
        "A list of [AccordionItem](/?path=/docs/component-accordion-accordionitem--docs) objects.",
      type: {
        name: "other",
        required: true,
        value: "array",
      },
      table: {
        type: { summary: "AccordionItem[]" },
      },
    },
  },
}

export default meta
type Story = StoryObj<AccordionType>

export const Accordion: Story = {}

export const DefaultOpen: Story = {
  args: {
    ...meta.args,
    items: [
      AccordionItem({
        title: "Music",
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
      AccordionItem({
        title: "Performances (default open)",
        open: true,
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
    ],
  },
}

export const ToggleAll: Story = {
  args: {
    toggleAll: true,
  },
}
