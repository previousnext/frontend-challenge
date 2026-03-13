import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./label.twig"
import "../form.css"
import { FormLabel as FormLabelType } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormLabelType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: "A form label",
    id: "label",
  },
}

export default meta
type Story = StoryObj<FormLabelType>

export const Label: Story = {}

export const Inline: Story = {
  args: {
    inline: true,
  },
}

export const Legend: Story = {
  args: {
    title: "A fieldset legend",
    as: "legend",
  },
}
