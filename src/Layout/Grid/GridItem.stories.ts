import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./grid-item.twig"
import "./grid.css"
import {
  AsTypes,
  GridItem as GridItemType,
  GridModifiers,
  SectionTypes,
} from "@pnx-mixtape/ids-shape"

/**
 * Individual Grid Items have similar options, but aren't designed to be used outside th parent Grid context.
 */
const meta: Meta<GridItemType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    item: "<span>item 1</span>",
    as: AsTypes.DIV,
  },
  argTypes: {
    modifiers: {
      description: "Span modifiers.",
      options: Object.values(GridModifiers),
      control: "multi-select",
    },
    as: {
      description:
        "Change the wrapper html element. When using lists on the Parent grid make sure to also change the GridItem `as=li`",
      options: Object.values(AsTypes),
      control: "select",
      table: {
        defaultValue: { summary: SectionTypes.DIV },
      },
    },
    item: {
      description: "The content of the GridItem (can be anything)",
      type: {
        name: "other",
        required: true,
        value: "array",
      },
      table: {
        type: { summary: "string | HTMLElement" },
      },
    },
  },
}

export default meta
type Story = StoryObj<GridItemType>

export const GridItem: Story = {}

/**
 * Column spans can be set for all or combined to control columns and specific breakpoints. See [span example](/?path=/docs/layout-grid--docs#span-12)
 */
export const Breakpoints: Story = {
  args: {
    modifiers: [GridModifiers.SM_2, GridModifiers.LG_4],
  },
}
