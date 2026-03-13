import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./input-divider.twig"
import "../form.css"

const meta: Meta<typeof Component> = {
  tags: ["autodocs"],
  component: Component,
}

export default meta
type Story = StoryObj<typeof meta>

export const InputDivider: Story = {
  args: {},
}
