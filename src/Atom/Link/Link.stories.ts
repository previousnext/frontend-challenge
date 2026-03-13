import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./link.twig"
import Icon from "../Icon/icon.twig"
import "../_base.css"
import { Link as LinkType } from "@pnx-mixtape/ids-shape"
import { Icons } from "../../enums"

/**
 * A link atom, with optional icon.
 */
const meta: Meta<LinkType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    href: "#",
    title: "Hyperlink",
  },
  argTypes: {
    href: {
      description: "The links URL value.",
    },
    title: {
      description: "The links text.",
    },
    current: {
      description: 'Adds the `aria-current="page"` attribute.',
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    more: {
      description: "A bolder link, usually combined with the **arrow-right** icon.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
        subcategory: "Special variants",
      },
    },
    external: {
      description: "Adds the **external-link** icon and screen reader text.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
        subcategory: "Special variants",
      },
    },
    download: {
      description: "Usually combined with the **download** icon.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
        subcategory: "Special variants",
      },
    },
    iconStart: {
      description:
        "An [Icon](/?path=/docs/atom-icon--docs) object, to display **before** the text.",
      table: {
        subcategory: "Icon",
      },
    },
    iconEnd: {
      description: "An [Icon](/?path=/docs/atom-icon--docs) object, to display **after** the text.",
      table: {
        subcategory: "Icon",
      },
    },
    iconOnly: {
      description:
        "When an icon is added, visually hide the link text so that only the icon is displayed.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        subcategory: "Icon",
      },
    },
  },
}

export default meta
type Story = StoryObj<LinkType>

export const Link: Story = {}

/**
 * More links are bolder and have a slight hover animation on their icon.
 */
export const More: Story = {
  args: {
    more: true,
    iconEnd: Icon({
      icon: Icons.ARROW_RIGHT,
    }),
  },
}

/**
 * External links add screen reader text "(opens in a new window)" to reflect their icon.
 */
export const External: Story = {
  args: {
    external: true,
  },
}

/**
 * Download links have a slight hover animation on their icon.
 */
export const Download: Story = {
  args: {
    download: true,
    title: "Download (PDF 12kb)",
    iconStart: Icon({
      icon: Icons.DOWNLOAD,
    }),
  },
}

/**
 * Any [Icon](/?path=/docs/atom-icon--docs) from the set can be used on links.
 */
export const IconLink: Story = {
  args: {
    iconStart: Icon({
      icon: Icons.LINK,
    }),
  },
}
