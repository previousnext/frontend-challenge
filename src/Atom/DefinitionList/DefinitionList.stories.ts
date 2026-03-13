import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./definition-list.twig"
import "../_base.css"
import { DefinitionList as DefinitionListType } from "@pnx-mixtape/ids-shape"

/**
 * The definition list is useful for categorising short pieces of content.
 * It uses `subgrid` to maintain alignment.
 */
const meta: Meta<DefinitionListType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    items: [
      {
        title: "Some title",
        content: "Some content",
      },
      {
        title: "Another title",
        content: "More content",
      },
      {
        title: "Yet another title",
        content: "And even more content",
      },
    ],
  },
  argTypes: {
    items: {
      description:
        "A list of title/content objects to use, where title is the `<dt>` value and content is the `<dd>` value.",
      type: {
        name: "other",
        required: true,
        value: "array",
      },
      table: {
        type: { summary: "{ title: string, content: string }[]" },
      },
    },
  },
}

export default meta
type Story = StoryObj<DefinitionListType>

export const DefinitionList: Story = {}
