import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./input-select.twig"
import "../form.css"
import { FormSelect as FormSelectType } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormSelectType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "form-input-select",
    name: "example-form-input",
    label: "Visually hidden label",
    options: [
      {
        label: "Option 1",
        value: "1",
      },
      {
        label: "Option 2",
        value: "2",
      },
      {
        label: "Option 3",
        value: "3",
      },
    ],
  },
}

export default meta
type Story = StoryObj<FormSelectType>

export const Select: Story = {}
