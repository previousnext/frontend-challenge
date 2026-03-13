import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./search-form.twig"
import "../form.css"

export type SearchFormType = {
  action: string
  id: string
}

const meta: Meta<SearchFormType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    action: "#search",
    id: "search-keyword",
  },
}

export default meta
type Story = StoryObj<SearchFormType>

export const Search: Story = {}
