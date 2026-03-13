import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "../FormItem/form-item.twig"
import InputRadio from "./input-radio.twig"
import Label from "../Label/label.twig"
import "../form.css"
import { FormItem as FormItemType } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormItemType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "radio-set",
    as: "fieldset",
    label: Label({
      title: "Do you like music?",
      as: "legend",
    }),
    fields: [
      InputRadio({
        id: "radio-set-yes",
        name: "music",
        label: "Yes",
        value: "yes",
      }),
      InputRadio({
        id: "radio-set-no",
        name: "music",
        label: "No",
        value: "no",
      }),
    ],
  },
  parameters: {
    deepControls: { enabled: true },
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
type Story = StoryObj<FormItemType>

export const Radio: Story = {}

export const Checked: Story = {
  args: {
    fields: [
      InputRadio({
        id: "radio-set-yes",
        name: "music",
        label: "Yes",
        value: "yes",
        checked: true,
      }),
      InputRadio({
        id: "radio-set-no",
        name: "music",
        label: "No",
        value: "no",
      }),
    ],
  },
}
