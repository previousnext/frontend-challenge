import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./card.twig"
import "./card.css"
import { Card as CardType, HeadingTypes, ListItemModifiers, TagTypes } from "@pnx-mixtape/ids-shape"
import { Icons, BackgroundStyles } from "../../enums"

// Deps.
import Heading from "../../Atom/Heading/heading.twig"
import Link from "../../Atom/Link/link.twig"
import Image from "../../Atom/Image/image.twig"
import Tags from "../Tag/tags.twig"
import LinkList from "../LinkList/link-list.twig"
import Icon from "../../Atom/Icon/icon.twig"
// css
import "../Tag/tag.css"
import "../LinkList/link-list.css"

export type MxCardType = Omit<CardType, "modifiers"> & {
  modifiers?: ListItemModifiers[]
  background?: BackgroundStyles
  collapse?: boolean
}

/**
 * A card that uses `@container` queries to be horizontal when there's enough space or vertical when not.
 */
const meta: Meta<MxCardType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "Card title",
      as: HeadingTypes.THREE,
    }),
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>",
    link: Link({
      href: "#",
      title: "Find out more",
      more: true,
    }),
    image: Image({
      src: "https://picsum.photos/id/56/558/418?grayscale",
      alt: "Blurry bubbles",
      width: 558,
      height: 418,
    }),
    collapse: false,
  },
  argTypes: {
    modifiers: {
      description:
        "The **block** modifier makes the whole card clickable. The **reverse** modifier positions the image on the left.",
      options: Object.values(ListItemModifiers),
      control: "check",
      table: { type: { summary: "enum" } },
    },
    background: {
      description: "Apply a background colour to the card.",
      options: Object.values(BackgroundStyles),
      control: "select",
      table: { type: { summary: "enum" } },
    },
    collapse: {
      description: "Collapse the layout on smaller screens so they take up less space.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    image: {
      description: "Optional [Image](/?path=/docs/atom-image--docs) component.",
      control: "text",
      table: {
        type: { summary: "Image" },
        subcategory: "Card content",
      },
    },
    title: {
      description: "A [Heading](/?path=/docs/atom-heading--docs) component.",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "Heading" },
        subcategory: "Card content",
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
        subcategory: "Card content",
      },
    },
    link: {
      description: "Optional content [Link](/?path=/docs/atom-link--docs).",
      control: "text",
      table: {
        type: { summary: "Link" },
        subcategory: "Card content",
      },
    },
    date: {
      description: "Optional date value (unformatted)",
      type: "string",
      control: "text",
      table: {
        subcategory: "Card content",
      },
    },
    tags: {
      description: "Optional [Tags](/?path=/docs/component-tags--docs).",
      control: "text",
      table: {
        type: { summary: "Tags" },
        subcategory: "Card content",
      },
    },
    linkList: {
      description: "Optional [LinkList](/?path=/docs/component-linklist--docs).",
      control: "text",
      table: {
        type: { summary: "LinkList" },
        subcategory: "Card content",
      },
    },
    icon: {
      description:
        "Optional [Icon](/?path=/docs/atom-icon--docs), should **not** be used in conjunction with Image.",
      control: "text",
      table: {
        type: { summary: "Icon" },
        subcategory: "Card content",
      },
    },
  },
}

export default meta
type Story = StoryObj<MxCardType>

export const Card: Story = {}

/**
 * Make the whole card clickable.
 */
export const BlockLink: Story = {
  args: {
    modifiers: [ListItemModifiers.BLOCK],
  },
}

/**
 * Position the image on the right.
 */
export const Reverse: Story = {
  args: {
    modifiers: [ListItemModifiers.REVERSE],
  },
}

/**
 * Collapse the layout on smaller screens so they take up less space.
 */
export const Collapse: Story = {
  args: {
    date: "25 May 2025",
    collapse: true,
  },
}

/**
 * Add a date or other value.
 */
export const Date: Story = {
  args: {
    date: "25 May 2025",
  },
}

/**
 * Adds a [Tags](/?path=/docs/component-tags--docs) component
 */
export const WithTags: Story = {
  args: {
    tags: Tags({
      items: ["Music", "News"],
      type: TagTypes.TEXT,
    }),
  },
}

/**
 * Adds a [LinkList](/?path=/docs/component-linklist--docs) component
 */
export const WithLinkList: Story = {
  args: {
    link: null,
    linkList: LinkList({
      items: [
        Link({
          title: "Link one",
          href: "#",
          iconEnd: Icon({
            icon: Icons.CHEVRON_RIGHT,
          }),
        }),
        Link({
          title: "Link two",
          href: "#",
          iconEnd: Icon({
            icon: Icons.CHEVRON_RIGHT,
          }),
        }),
        Link({
          title: "Link three",
          href: "#",
          iconEnd: Icon({
            icon: Icons.CHEVRON_RIGHT,
          }),
        }),
      ],
    }),
  },
}

/**
 * The Tile version is a simple card with a `box` background, the `block` modifier and no image.
 */
export const Tile: Story = {
  args: {
    title: Heading({
      title: "Tile title",
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
    image: null,
  },
}

/**
 * The Tile version often also has an [Icon](/?path=/docs/atom-icon--docs).
 */
export const IconTile: Story = {
  args: {
    ...Tile.args,
    icon: Icon({
      icon: Icons.HEART,
    }),
  },
}
