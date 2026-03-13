import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./icon.twig"
import "./icon.css"
import {
  Icon as IconType,
  AlignmentTypes,
  IconColourModifier,
  IconRotateModifier,
  IconSizeModifier,
} from "@pnx-mixtape/ids-shape"
import { Icons } from "../../enums"

type IconArgs = IconType & {
  icon: Icons
}

const meta: Meta<IconArgs> = {
  tags: ["ids-mvp"],
  component: Component,
  args: {
    icon: Icons.ARROW_RIGHT,
    size: IconSizeModifier.SMALL,
  },
  argTypes: {
    icon: {
      description: "The name of the icon to use",
      options: Object.values(Icons),
      control: "select",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "enum" },
      },
    },
    color: {
      description: "Icons can be coloured.",
      options: Object.values(IconColourModifier),
      control: "select",
      table: {
        type: { summary: "enum" },
      },
    },
    size: {
      description: "Optionally adjust the size of the icon.",
      options: Object.values(IconSizeModifier),
      control: "radio",
      table: {
        defaultValue: { summary: IconSizeModifier.SMALL },
        type: { summary: "enum" },
      },
    },
    rotate: {
      description: "Optionally rotate an icon.",
      options: Object.values(IconRotateModifier),
      control: "radio",
      table: {
        type: { summary: "enum" },
      },
    },
    text: {
      description: "Text can be placed next to an icon.",
      type: "string",
    },
    align: {
      description: "When used with text, you can align to the start or end of it.",
      options: Object.values(AlignmentTypes),
      control: "radio",
      table: {
        defaultValue: { summary: AlignmentTypes.START },
        type: { summary: "enum" },
      },
      if: { arg: "text" },
    },
  },
}

export default meta
type Story = StoryObj<IconArgs>

export const Icon: Story = {}

/**
 * Icons by default inherit the current text colour, but they can be explicitly coloured.
 */
export const Primary: Story = {
  args: {
    color: IconColourModifier.BRAND,
  },
}

/**
 * Icons can be sized.
 */
export const Large: Story = {
  args: {
    size: IconSizeModifier.XLARGE,
  },
}

/**
 * Add some text to the icon.
 */
export const WithText: Story = {
  args: {
    text: "Message with icon",
  },
}

/**
 * Align the text to the end instead of the start.
 */
export const Alignment: Story = {
  args: {
    text: "Message with icon",
    icon: Icons.ARROW_LEFT,
    align: AlignmentTypes.END,
  },
}
