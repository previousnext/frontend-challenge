import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./carousel.twig"
import "./carousel.css"
import "./Elements/Carousel"
import { Carousel as CarouselType, HeadingTypes, ListItemModifiers } from "@pnx-mixtape/ids-shape"

// Deps.
import Card from "../Card/card.twig"
import "../Card/card.css"
import Heading from "../../Atom/Heading/heading.twig"
import Link from "../../Atom/Link/link.twig"
import { BackgroundStyles } from "../../enums"

/**
 * A carousel of GridItems (usually Cards), that natively scrolls.
 *
 * Extra features like Forward/Back buttons and counters can be added with the `Carousel` element javascript (if items exceed the container)
 *
 * The number if items visible can be controlled with CSS by setting the `--inline-size` property (default to 25ch).
 */
const meta: Meta<CarouselType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    counter: false,
    pagination: false,
    loop: false,
    items: [
      Card({
        title: Heading({
          title: "Tile 1",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 2",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 3",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 4",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 5",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content:
          "<p>Tiles are just block cards without an image but may have longer text and trigger height changes..</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 6",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 7",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 8",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 9",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 10",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 11",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
    ],
  },
  argTypes: {
    items: {
      description:
        "A list of `GridItem` objects, usually [Cards](/?path=/docs/component-card--docs) or [ContentBlocks](/?path=/docs/component-contentblock--docs).",
      type: {
        name: "other",
        required: true,
        value: "array",
      },
      table: {
        type: { summary: "GridItem[]" },
      },
    },
    loop: {
      description:
        "Loop back to the start when the end has been reached. Requires the `Carousel` javascript.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    pagination: {
      description: "Adds numbered pagination. Requires the `Carousel` javascript.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    counter: {
      description: "Adds counter dot navigation. Requires the `Carousel` javascript.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
}

export default meta
type Story = StoryObj<CarouselType>

export const Carousel: Story = {}

/**
 * Display counter dot navigation.
 */
export const Counters: Story = {
  args: {
    counter: true,
  },
}

/**
 * Display numbered pagination.
 */
export const Paginated: Story = {
  args: {
    pagination: true,
  },
}

/**
 * Loop back to start when the end is reached and the next button is clicked.
 */
export const Loop: Story = {
  args: {
    loop: true,
  },
}
