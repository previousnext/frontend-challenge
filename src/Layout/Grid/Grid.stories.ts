import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./grid.twig"
import GridItem from "./grid-item.twig"
import "./grid.css"
import { AsTypes, Grid as GridType, GridModifiers, SectionTypes } from "@pnx-mixtape/ids-shape"

/**
 * A CSS grid that is dynamic by default.
 */
const meta: Meta<GridType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    items: [
      GridItem({ item: "<span>item 1</span>" }),
      GridItem({ item: "<span>item 2</span>" }),
      GridItem({ item: "<span>item 3</span>" }),
      GridItem({ item: "<span>item 4</span>" }),
      GridItem({ item: "<span>item 5</span>" }),
      GridItem({ item: "<span>item 6</span>" }),
    ],
    as: SectionTypes.DIV,
  },
  argTypes: {
    modifiers: {
      description: "Grid modifiers.",
      options: Object.values(GridModifiers),
      control: "multi-select",
    },
    as: {
      description:
        "Change the wrapper html element. When using lists make sure to also change the GridItem `as=li`",
      options: Object.values(SectionTypes),
      control: "select",
      table: {
        defaultValue: { summary: SectionTypes.DIV },
      },
    },
    items: {
      description: "A list of [GridItem](/?path=/docs/layout-grid-griditem--docs) objects.",
      type: {
        name: "other",
        required: true,
        value: "array",
      },
      table: {
        type: { summary: "GridItem" },
      },
    },
  },
}

export default meta
type Story = StoryObj<GridType>

export const Grid: Story = {}

/**
 * Column widths can be set for all or combined to control columns and specific breakpoints.
 */
export const Breakpoints: Story = {
  args: {
    modifiers: [GridModifiers.SM_2, GridModifiers.LG_4],
  },
}

/**
 * When using Grid as a list, be sure to set the GridItem `as=li`
 */
export const List: Story = {
  args: {
    as: SectionTypes.LIST,
    modifiers: [GridModifiers.SM_2],
    items: [
      GridItem({
        item: ["list item 1"],
        as: AsTypes.LI,
      }),
      GridItem({
        item: ["list item 2"],
        as: AsTypes.LI,
      }),
    ],
  },
}

/**
 * GridItems can span multiple columns.
 */
export const Span: Story = {
  args: {
    modifiers: [GridModifiers.SM_2, GridModifiers.MD_3],
    items: [
      GridItem({ item: "<span>item 1</span>" }),
      GridItem({
        item: ["item 2, span 2"],
        modifiers: [GridModifiers.MD_2],
      }),
    ],
  },
}
