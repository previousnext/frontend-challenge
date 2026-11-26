import { Meta, StoryObj } from "@storybook/html-vite"
import { expect, waitFor } from "storybook/test"
import Component from "./accordion.twig"
import AccordionItem from "./accordion-item.twig"
import Heading from "../../Atom/Heading/heading.twig"
import "./Elements/Accordion"
import "./Elements/AccordionGroup"
import "./accordion.css"
import { Accordion as AccordionType, HeadingTypes } from "@pnx-mixtape/ids-shape"

const meta: Meta<AccordionType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: Heading({
      title: "Accordion group",
      as: HeadingTypes.TWO,
    }),
    items: [
      AccordionItem({
        title: "Music",
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
      AccordionItem({
        title: "Performances",
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
    ].join(""),
  },
  argTypes: {
    toggleAll: {
      control: "boolean",
      description: "Include the **Expand all / Collapse all** behaviour.",
      table: { defaultValue: { summary: "false" } },
      type: "boolean",
    },
    title: {
      description:
        "Optional [Heading](/?path=/docs/atom-heading--docs) component, displayed above the accordions.",
      control: "text",
    },
    items: {
      description:
        "A concatenated string of [AccordionItem](/?path=/docs/component-accordion-accordionitem--docs) markup.",
      type: {
        name: "other",
        required: true,
        value: "string",
      },
      table: {
        type: { summary: "string" },
      },
    },
  },
}

export default meta
type Story = StoryObj<AccordionType>

export const Accordion: Story = {}

export const DefaultOpen: Story = {
  args: {
    ...meta.args,
    items: [
      AccordionItem({
        title: "Music",
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
      AccordionItem({
        title: "Performances (default open)",
        open: true,
        content:
          "I'm baby air plant hashtag letterpress blue bottle. Cloud bread dreamcatcher everyday carry lumbersexual, iceland cardigan swag chicharrones lo-fi fanny pack affogato freegan XOXO shaman. Shoreditch cloud bread waistcoat tbh XOXO. Chillwave pour-over umami pug glossier health goth.",
      }),
    ].join(""),
  },
}

export const ToggleAll: Story = {
  args: {
    toggleAll: true,
  },
  parameters: {
    docs: {
      story: { autoplay: true },
    },
  },
  play: async ({ canvas, userEvent, mount, step }) => {
    window.location.hash = "#music"
    await mount()
    const toggleAll = canvas.getByRole("button", { name: "Expand all" })
    const accordions = canvas.getAllByRole("group")
    const summary = canvas.getByText("Music")
    await step("Is open when URL has #music", async () => {
      await expect(accordions[0]).toHaveAttribute("open")
    })
    await step("Closes on click", async () => {
      await userEvent.click(summary)
      await expect(accordions[0]).not.toHaveAttribute("open")
    })
    await step("Opens all on expand all", async () => {
      await expect(toggleAll).toHaveAttribute("aria-expanded", "false")
      await userEvent.click(toggleAll)
      for (const accordion in accordions) {
        // oxlint-disable-next-line no-await-in-loop
        await expect(accordions[accordion]).toHaveAttribute("open")
      }
      await expect(toggleAll).toHaveAttribute("aria-expanded", "true")
      await expect(toggleAll).toHaveAccessibleName("Collapse all")
    })
    await step("Reads as collapsed again once any item closes", async () => {
      await userEvent.click(summary)
      await waitFor(() => expect(toggleAll).toHaveAttribute("aria-expanded", "false"))
      await expect(toggleAll).toHaveAccessibleName("Expand all")
      await userEvent.click(toggleAll)
      await expect(toggleAll).toHaveAttribute("aria-expanded", "true")
    })
    await step("Closes all on collapse all", async () => {
      await userEvent.click(toggleAll)
      for (const accordion in accordions) {
        // oxlint-disable-next-line no-await-in-loop
        await expect(accordions[accordion]).not.toHaveAttribute("open")
      }
      await expect(toggleAll).toHaveAttribute("aria-expanded", "false")
    })
  },
}

