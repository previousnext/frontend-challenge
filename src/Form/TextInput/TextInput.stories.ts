import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./input-text.twig"
import "../form.css"
import { FormText as FormTextType, InputTypeTypes } from "@pnx-mixtape/ids-shape"
import { Icons } from "../../enums"

type FormTextIconType = FormTextType & {
  icon?: Icons
}

const meta: Meta<FormTextIconType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "form-input-text",
    type: InputTypeTypes.TEXT,
    name: "example-form-input",
    placeholder: "A text field",
    label: "Visually hidden label",
  },
  argTypes: {
    icon: { options: Object.values(Icons), control: "select" },
  },
}

export default meta
type Story = StoryObj<FormTextIconType>

export const TextInput: Story = {}

export const Icon: Story = {
  args: {
    icon: Icons.EMAIL,
    type: InputTypeTypes.EMAIL,
  },
}
