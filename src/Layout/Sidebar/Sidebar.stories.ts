import { Meta, StoryObj } from "@storybook/html-vite"
import { SidebarOrder } from "../../enums"
import Component from "./sidebar.twig"
import "./sidebar.css"

type SidebarArgs = {
  content?: string | HTMLElement
  order?: SidebarOrder
  before?: boolean
  sidebarContent?: string | HTMLElement
}

/**
 * A CSS Grid sidebar layout.
 */
const meta: Meta<SidebarArgs> = {
  tags: ["autodocs"],
  component: Component,
  args: {
    content: "Main content",
    sidebarContent: "Sidebar content",
  },
  argTypes: {
    order: {
      description: "Change the visual position of the sidebar.",
      options: Object.values(SidebarOrder),
      control: "radio",
      table: {
        type: { summary: "enum" },
      },
    },
    before: {
      description: "Change the semantic (html) position of the sidebar.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    content: {
      description: "The main column content",
      table: {
        type: { summary: "String | WysiwygText | HTMLElement" },
        subcategory: "Content",
      },
    },
    sidebarContent: {
      description: "The side column content",
      table: {
        type: { summary: "String | WysiwygText | HTMLElement" },
        subcategory: "Content",
      },
    },
  },
}

export default meta
type Story = StoryObj<SidebarArgs>

export const Sidebar: Story = {}

/**
 * Move the sidebar first in the HTML.
 */
export const SidebarFirst: Story = {
  args: {
    before: true,
  },
}

/**
 * Reverse at the medium breakpoint.
 */
export const RevserseMedium: Story = {
  args: {
    order: SidebarOrder.REVERSE,
  },
}

/**
 * Only reverse for larger breakpoints.
 */
export const ReverseLarge: Story = {
  args: {
    order: SidebarOrder.REVERSE_L,
  },
}

/**
 * The sidebar is optional.
 */
export const NoSidebar: Story = {
  args: {
    sidebarContent: null,
  },
}
