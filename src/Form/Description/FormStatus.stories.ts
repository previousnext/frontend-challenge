import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./form-status.twig"
import "../form.css"
import { FormStatus as FormStatusType, FormStatusTypes } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormStatusType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "message",
    type: FormStatusTypes.INVALID,
    message: "Help text that provides additional information about the field.",
  },
  argTypes: {
    type: { options: Object.values(FormStatusTypes), control: "radio" },
  },
}

export default meta
type Story = StoryObj<FormStatusType>

export const Message: Story = {}

export const Success: Story = {
  args: {
    type: FormStatusTypes.VALID,
  },
}
