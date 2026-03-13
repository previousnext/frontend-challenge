import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./form-item.twig"
import FormDescription from "../Description/form-description.twig"
import FormStatus from "../Description/form-status.twig"
import Label from "../Label/label.twig"
import TextInput from "../TextInput/input-text.twig"
import "../form.css"
import { FormItem as FormItemType, FormStatusTypes, InputTypeTypes } from "@pnx-mixtape/ids-shape"

const meta: Meta<FormItemType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "form-item",
    label: Label({
      id: "form-item",
      title: "What's your favourite music?",
    }),
    descriptionEnd: FormDescription({
      id: "form-item",
      description: "Help text that provides additional information about the field.",
    }),
    fields: TextInput({
      id: "form-item",
      type: InputTypeTypes.TEXT,
      name: "example-form-item",
      placeholder: "eg. Funk, Soul, Blues..",
      hasDescription: true,
    }),
  },
  argTypes: {
    // @ts-expect-error The controls follow the shape
    "status.type": {
      options: Object.values(FormStatusTypes),
      control: "radio",
    },
    "status.message": { control: "text" },
  },
}

export default meta
type Story = StoryObj<FormItemType>

export const FormItem: Story = {}

export const Success: Story = {
  args: {
    status: FormStatus({
      id: "form-item",
      type: FormStatusTypes.VALID,
      message: "Congratulations, you are correct!",
    }),
    fields: TextInput({
      id: "form-item",
      type: InputTypeTypes.TEXT,
      name: "example-form-item",
      placeholder: "eg. Funk, Soul, Blues..",
      hasDescription: true,
      value: "Jazz",
      status: FormStatusTypes.VALID,
    }),
  },
}

export const Error: Story = {
  args: {
    status: FormStatus({
      id: "form-item",
      type: FormStatusTypes.INVALID,
      message: "Oops, you made a mistake.",
    }),
    fields: TextInput({
      id: "form-item",
      type: InputTypeTypes.TEXT,
      name: "example-form-item",
      placeholder: "eg. Funk, Soul, Blues..",
      hasDescription: true,
      value: "Musicals",
      status: FormStatusTypes.INVALID,
    }),
  },
}

export const Required: Story = {
  args: {
    fields: TextInput({
      id: "form-item",
      type: InputTypeTypes.TEXT,
      name: "example-form-item",
      placeholder: "eg. Funk, Soul, Blues..",
      hasDescription: true,
      value: "Musicals",
      required: true,
    }),
  },
}

export const Fieldset: Story = {
  args: {
    as: "fieldset",
    label: Label({
      title: "What's your favourite music?",
      as: "legend",
    }),
    fields: TextInput({
      id: "form-item",
      type: InputTypeTypes.TEXT,
      name: "example-form-item",
      placeholder: "eg. Funk, Soul, Blues..",
      label: "Visually hidden label",
      hasDescription: true,
    }),
  },
}

export const DescriptionBefore: Story = {
  args: {
    descriptionEnd: null,
    descriptionStart: FormDescription({
      id: "form-item",
      description: "Help text that provides additional information about the field.",
    }),
  },
}
