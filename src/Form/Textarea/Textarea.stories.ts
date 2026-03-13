import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./input-textarea.twig"
import "../form.css"
import { FormTextArea as FormTextAreaType } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormTextAreaType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "form-input-textarea",
    name: "example-form-input",
    label: "Visually hidden label",
  },
}

export default meta
type Story = StoryObj<FormTextAreaType>

export const TextArea: Story = {}
