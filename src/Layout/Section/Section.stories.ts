import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./section.twig"
import Link from "../../Atom/Link/link.twig"
import Icon from "../../Atom/Icon/icon.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./section.css"
import { BackgroundStyles, Icons } from "../../enums"
import {
  HeadingTypes,
  Section as SectionType,
  SectionModifiers,
  SectionTypes,
} from "@pnx-mixtape/ids-shape"

const meta: Meta<SectionType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    modifiers: [SectionModifiers.XL],
    as: SectionTypes.DIV,
    container: true,
    content:
      '<p class="mx-text--lede">A short description to help explain enough about the subject matter to encourage visitors to learn more.</p>',
    title: Heading({
      title: "Section name",
      as: HeadingTypes.TWO,
    }),
    link: Link({
      href: "#",
      title: "See more content",
      more: true,
      iconEnd: Icon({
        icon: Icons.ARROW_RIGHT,
      }),
    }),
  },
  argTypes: {
    modifiers: {
      description: "Set the vertical spacing.",
      options: Object.values(SectionModifiers),
      control: "multi-select",
      table: {
        defaultValue: { summary: SectionModifiers.XL },
        type: { summary: "enum" },
      },
    },
    background: {
      description: "Change the background colour.",
      options: Object.values(BackgroundStyles),
      control: "select",
      table: {
        type: { summary: "enum" },
      },
    },
    as: {
      description: "Change the wrapper html element.",
      options: Object.values(SectionTypes),
      control: "select",
      table: {
        type: { summary: "enum" },
        defaultValue: { summary: SectionTypes.DIV },
      },
    },
    container: {
      description: "Create a container context inside the section.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    title: {
      description: "An optional [Heading](/?path=/docs/atom-heading--docs) component.",
      control: "text",
      table: {
        type: { summary: "Heading" },
        subcategory: "Section content",
      },
    },
    content: {
      description: "Content (can be anything).",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "WysiwygText | HTMLElement" },
        subcategory: "Section content",
      },
    },
    link: {
      description: "Optional content [Link](/?path=/docs/atom-link--docs).",
      control: "text",
      table: {
        type: { summary: "Link" },
        subcategory: "Section content",
      },
    },
  },
}

export default meta
type Story = StoryObj<SectionType>

export const Section: Story = {}

/**
 * Sections can have different top/bottom modifiers.
 */
export const Modifiers: Story = {
  args: {
    modifiers: [SectionModifiers.TOP_S, SectionModifiers.BOTTOM_XL],
  },
}

/**
 * Heading and link are optional.
 */
export const Header: Story = {
  args: {
    title: null,
    link: null,
  },
}

/**
 * Background colours span the full width.
 */
export const Background: Story = {
  args: {
    background: BackgroundStyles.PRIMARY,
  },
}

/**
 * With the exception of the box.
 */
export const Box: Story = {
  args: {
    background: BackgroundStyles.BOX,
  },
}
