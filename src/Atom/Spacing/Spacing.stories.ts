import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./spacing.twig"

const modifierOptions: string[] = [
  "xs",
  "s",
  "m",
  "l",
  "xl",
  "top-xs",
  "top-s",
  "top-m",
  "top-l",
  "top-xl",
  "bottom-xs",
  "bottom-s",
  "bottom-m",
  "bottom-l",
  "bottom-xl",
  "left-xs",
  "left-s",
  "left-m",
  "left-l",
  "left-xl",
  "right-xs",
  "right-s",
  "right-m",
  "right-l",
  "right-xl",
  "reset",
  "reset-top",
  "reset-bottom",
  "reset-left",
  "reset-right",
]

type SpacingType = {
  modifier?: (typeof modifierOptions)[number]
}

/**
 * Demonstration of the spacing helper classes that are available to add padding to an element.
 */
const meta: Meta<SpacingType> = {
  tags: ["autodocs"],
  component: Component,
  args: {
    modifier: modifierOptions[0],
  },
  argTypes: {
    modifier: {
      description: "The spacing option",
      options: modifierOptions,
      control: "select",
    },
  },
}

export default meta
type Story = StoryObj<SpacingType>

export const Spacing: Story = {}
