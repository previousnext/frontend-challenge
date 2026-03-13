import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./table.twig"
import "../_base.css"
import { TableStyles } from "../../enums"

type TableType = {
  modifiers?: TableStyles[]
}

const meta: Meta<TableType> = {
  tags: ["autodocs"],
  component: Component,
  argTypes: {
    modifiers: {
      description: "Define the style of the table.",
      options: Object.values(TableStyles),
      control: "multi-select",
      table: {
        type: { summary: "enum" },
      },
    },
  },
}

export default meta
type Story = StoryObj<TableType>

export const Table: Story = {
  args: {},
}

export const Striped: Story = {
  args: {
    modifiers: [TableStyles.STRIPED],
  },
}

export const Bordered: Story = {
  args: {
    modifiers: [TableStyles.BORDERED],
  },
}

export const StripedAndBordered: Story = {
  args: {
    modifiers: [TableStyles.BORDERED, TableStyles.STRIPED],
  },
}
