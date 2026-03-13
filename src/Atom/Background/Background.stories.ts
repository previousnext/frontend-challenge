import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./backgrounds.twig"
import "./_background.css"
import { BackgroundStyles } from "../../enums"

type BackgroundsType = {
  modifier?: BackgroundStyles
}

/**
 * Background colours also set appropriate foreground colours to ensure contrast is met.
 */
const meta: Meta<BackgroundsType> = {
  tags: ["autodocs"],
  component: Component,
  argTypes: {
    modifier: {
      description: "Define the colour the use.",
      options: Object.values(BackgroundStyles),
      control: "select",
      table: {
        type: { summary: "enum" },
      },
    },
  },
  decorators: [],
}

export default meta
type Story = StoryObj<BackgroundsType>

export const Backgrounds: Story = {}

/**
 * Nested elements can have their background reset to the default using the `.mx-background--reset` class.
 */
export const Alt: Story = {
  args: {
    modifier: BackgroundStyles.ALT,
  },
}

/**
 * Dark background set the colour scheme to `dark` to ensure foreground text meets contrast requirements.
 */
export const Reverse: Story = {
  args: {
    modifier: BackgroundStyles.REVERSE,
  },
}

/**
 * Link and line colour can also be customised per background.
 */
export const Primary: Story = {
  args: {
    modifier: BackgroundStyles.PRIMARY,
  },
}

export const Accent: Story = {
  args: {
    modifier: BackgroundStyles.ACCENT,
  },
  decorators: [],
}
