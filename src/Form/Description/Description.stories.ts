import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./form-description.twig"
import "../form.css"
import { FormDescription as FormDescriptionType } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormDescriptionType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "description",
    description: "Help text that provides additional information about the field.",
  },
}

export default meta
type Story = StoryObj<FormDescriptionType>

export const Description: Story = {}
