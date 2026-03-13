import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./hero-banner.twig"
import "./hero-banner.css"
import {
  HeroBannerModifier,
  HeadingTypes,
  HeroBanner as HeroBannerType,
} from "@pnx-mixtape/ids-shape"
import { Icons } from "../../enums"

// Deps.
import Heading from "../../Atom/Heading/heading.twig"
import Link from "../../Atom/Link/link.twig"
import Image from "../../Atom/Image/image.twig"
import LinkList from "../LinkList/link-list.twig"
import Icon from "../../Atom/Icon/icon.twig"
// css
import "../LinkList/link-list.css"

/**
 * Hero Banners are primary used to display the page title.
 */
const meta: Meta<HeroBannerType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "Hero banner title",
      as: HeadingTypes.ONE,
    }),
    subtitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: Image({
      src: "https://picsum.photos/id/56/558/418?grayscale",
      alt: "Blurry bubbles",
    }),
    modifiers: [HeroBannerModifier.WHITE],
  },
  argTypes: {
    modifiers: {
      description: "Controls the background colour",
      options: Object.values(HeroBannerModifier),
      control: "check",
      table: {
        defaultValue: { summary: HeroBannerModifier.WHITE },
        type: { summary: "enum" },
      },
    },
    image: {
      description: "Optional [Image](/?path=/docs/atom-image--docs) component.",
      control: "text",
      table: {
        type: { summary: "Image" },
        subcategory: "Hero content",
      },
    },
    subtitle: {
      description: "Content that is displayed in the `lede` style.",
      control: "text",
      table: {
        type: { summary: "WysiwygText" },
        subcategory: "Hero content",
      },
    },
    title: {
      description:
        "A [Heading](/?path=/docs/atom-heading--docs) component, should be H1 if used as the page title.",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "Heading" },
        subcategory: "Hero content",
      },
    },
    content: {
      description: "Content.",
      control: "text",
      table: {
        type: { summary: "WysiwygText" },
        subcategory: "Hero content",
      },
    },
    link: {
      description:
        "Optional content [Link](/?path=/docs/atom-link--docs) or [Button](/?path=/docs/atom-button--docs).",
      control: "text",
      table: {
        type: { summary: "Link | Button" },
        subcategory: "Hero content",
      },
    },
    linkList: {
      description: "Optional [LinkList](/?path=/docs/component-linklist--docs).",
      control: "text",
      table: {
        type: { summary: "LinkList" },
        subcategory: "Hero content",
      },
    },
    highlight: {
      description: "Makes a slightly larger hero, usually reserved for home pages.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
}

export default meta
type Story = StoryObj<HeroBannerType>

export const HeroBanner: Story = {}

/**
 * Highlight is often reserved for the home or campaign type pages.
 */
export const Highlight: Story = {
  args: {
    highlight: true,
    modifiers: [HeroBannerModifier.LIGHT],
    link: Link({
      href: "#",
      title: "Find out more",
      more: true,
    }),
  },
}

/**
 * The image is optional.
 */
export const WithoutImage: Story = {
  args: {
    image: null,
  },
}

/**
 * A [LinkList](/?path=/docs/component-linklist--docs) component is useful for displaying popular links. It currently cannot be used with Image.
 */
export const WithLinkList: Story = {
  args: {
    link: null,
    linkList: LinkList({
      title: Heading({
        title: "Popular links",
        as: HeadingTypes.TWO,
        modifiers: [HeadingTypes.FOUR],
      }),
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
