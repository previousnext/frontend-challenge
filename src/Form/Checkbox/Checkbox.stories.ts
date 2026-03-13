import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./input-checkbox.twig"
import "../form.css"
import { FormControl as FormControlType } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormControlType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "single-checkbox",
    name: "terms",
    label: "I agree to the terms and conditions.",
    value: "agree",
  },
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            // ID's are not unique due to test-runner.
            id: "label",
            enabled: false,
          },
        ],
      },
    },
  },
}

export default meta
type Story = StoryObj<FormControlType>

export const Checkbox: Story = {}

export const Checked: Story = {
  args: {
    checked: true,
  },
}
