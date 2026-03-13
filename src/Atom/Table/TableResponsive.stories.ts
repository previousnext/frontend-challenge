import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./table-responsive.twig"
import "../_base.css"

const meta: Meta<typeof Component> = {
  tags: ["autodocs"],
  component: Component,
}

export default meta
type Story = StoryObj<typeof meta>

export const TableResponsive: Story = {
  args: {},
}
