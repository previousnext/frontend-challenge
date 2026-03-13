import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./link-list.twig"
import "./link-list.css"

// Deps.
import Link from "../../Atom/Link/link.twig"
import Icon from "../../Atom/Icon/icon.twig"
import Heading from "../../Atom/Heading/heading.twig"
import { Icons } from "../../enums"
import { HeadingTypes } from "@pnx-mixtape/ids-shape"

const meta: Meta<typeof Component> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    items: [
      Link({
        title: "Music",
        href: "#",
        iconEnd: Icon({
          icon: Icons.CHEVRON_RIGHT,
        }),
      }),
      Link({
        title: "Performances",
        href: "#",
        iconEnd: Icon({
          icon: Icons.CHEVRON_RIGHT,
        }),
      }),
      Link({
        title: "Get involved",
        href: "#",
        iconEnd: Icon({
          icon: Icons.CHEVRON_RIGHT,
        }),
      }),
    ],
  },
  argTypes: {
    title: {
      description: "Optional [Heading](/?path=/docs/atom-heading--docs) component.",
      control: "text",
      table: {
        type: { summary: "Heading" },
      },
    },
    items: {
      description: `A list of [Link](/?path=/docs/atom-link--docs) objects to use for the menu. These should include the \`${Icons.CHEVRON_RIGHT}\` [Icon](/?path=/docs/atom-icon--docs)`,
      type: {
        name: "other",
        required: true,
        value: "array",
      },
      table: {
        type: { summary: "Link[]" },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const LinkList: Story = {}

/**
 * Adds a heading above the list.
 */
export const WithTitle: Story = {
  args: {
    title: Heading({
      title: "Popular links",
      as: HeadingTypes.TWO,
      modifiers: [HeadingTypes.FOUR],
    }),
  },
}
