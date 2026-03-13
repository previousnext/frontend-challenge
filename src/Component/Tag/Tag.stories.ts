import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./tags.twig"
import "./tag.css"
import { Tags as TagType, TagTypes } from "@pnx-mixtape/ids-shape"

/**
 * Tags can help categorise content.
 */
const meta: Meta<TagType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    items: ["Music", "News"],
    type: TagTypes.TEXT,
  },
  argTypes: {
    type: {
      description:
        "Define the type of the tags. Changing the type also requires a different item shape.",
      options: Object.values(TagTypes),
      control: "radio",
      table: {
        defaultValue: { summary: TagTypes.TEXT },
        type: { summary: "enum" },
      },
    },
    items: {
      description: "A list of items to use for the tags, which is different for each `type`.",
      table: {
        type: {
          summary:
            "string[] | { title: string, href: string }[] | { label: string, id: string, name: string, value: string }[]",
        },
      },
    },
  },
}

export default meta
type Story = StoryObj<TagType>

export const Tag: Story = {}

/**
 * Tags can be links.
 */
export const Link: Story = {
  args: {
    type: TagTypes.LINK,
    items: [
      {
        title: "Music",
        href: "#0",
      },
      {
        title: "News",
        href: "#0",
      },
    ],
  },
}

/**
 * Tags can also be checkboxes, often used for filters.
 */
export const Checkbox: Story = {
  args: {
    type: TagTypes.CHECKBOX,
    items: [
      {
        label: "Music",
        id: "music",
        name: "tag",
        value: "music",
      },
      {
        label: "News",
        id: "news",
        name: "tag",
        value: "news",
      },
    ],
  },
}
