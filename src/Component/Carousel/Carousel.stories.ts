import { Meta, StoryObj } from "@storybook/html-vite"
import { expect, waitFor } from "storybook/test"
import Component from "./carousel.twig"
import "./carousel.css"
import "./Elements/Carousel"
import { Carousel as CarouselType, HeadingTypes, ListItemModifiers } from "@pnx-mixtape/ids-shape"

// Deps.
import Card from "../Card/card.twig"
import "../Card/card.css"
import Heading from "../../Atom/Heading/heading.twig"
import Link from "../../Atom/Link/link.twig"
import { BackgroundStyles } from "../../enums"

/**
 * A carousel of GridItems (usually Cards), that natively scrolls.
 *
 * Extra features like Forward/Back buttons and counters can be added with the `Carousel` element javascript (if items exceed the container)
 *
 * The number if items visible can be controlled with CSS by setting the `--inline-size` property (default to 25ch).
 */
const meta: Meta<CarouselType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    counter: false,
    pagination: false,
    loop: false,
    items: [
      Card({
        title: Heading({
          title: "Tile 1",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 2",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 3",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 4",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 5",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content:
          "<p>Tiles are just block cards without an image but may have longer text and trigger height changes..</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 6",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 7",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 8",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 9",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 10",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
      Card({
        title: Heading({
          title: "Tile 11",
          as: HeadingTypes.THREE,
        }),
        link: Link({
          href: "#",
          title: "Find out more",
          more: true,
        }),
        content: "<p>Tiles are just block cards without an image.</p>",
        background: BackgroundStyles.BOX,
        modifiers: [ListItemModifiers.BLOCK],
      }),
    ].join(""),
  },
  argTypes: {
    items: {
      description:
        "A concatenated string of `GridItem` markup, usually [Cards](/?path=/docs/component-card--docs) or [ContentBlocks](/?path=/docs/component-contentblock--docs).",
      type: {
        name: "other",
        required: true,
        value: "string",
      },
      table: {
        type: { summary: "string" },
      },
    },
    loop: {
      description:
        "Loop back to the start when the end has been reached. Requires the `Carousel` javascript.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    pagination: {
      description: "Adds numbered pagination. Requires the `Carousel` javascript.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    counter: {
      description: "Adds counter dot navigation. Requires the `Carousel` javascript.",
      type: "boolean",
      table: {
        defaultValue: { summary: "false" },
      },
    },
  },
}

export default meta
type Story = StoryObj<CarouselType>

export const Carousel: Story = {
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const isMobile = matchMedia("(max-width: 767px)").matches
    const back = await canvas.findByRole("button", { name: "previous page" }, { timeout: 2000 })
    const next = await canvas.findByRole("button", { name: "next page" }, { timeout: 2000 })
    // The custom element's IntersectionObserver populates its internal item
    // map asynchronously after mount - wait for its first pass (visible via
    // the resulting `aria-hidden`) before clicking, or navigation can run
    // against an empty item map.
    await waitFor(
      () => expect(canvasElement.querySelector('[data-index="0"]')).toHaveAttribute("aria-hidden"),
      { timeout: 2000 },
    )
    await step("Has prev/next buttons", async () => {
      await expect(back).toHaveAttribute("disabled")
      await expect(next).not.toHaveAttribute("disabled")
    })
    await step("Navigates on click", async () => {
      await userEvent.click(next)
      await waitFor(
        () => {
          expect(back).not.toHaveAttribute("disabled")
          expect(next).not.toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
      if (!isMobile) {
        await userEvent.click(next)
        await waitFor(
          () => {
            expect(back).not.toHaveAttribute("disabled")
            expect(next).toHaveAttribute("disabled")
          },
          { timeout: 2000 },
        )
      }
    })
    await step("Navigates back", async () => {
      await userEvent.click(back)
      if (!isMobile) {
        await userEvent.click(back)
      }
      await waitFor(
        () => {
          expect(back).toHaveAttribute("disabled")
          expect(next).not.toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
      // Remove focus
      await userEvent.click(canvasElement)
    })
  },
}

/**
 * Display counter dot navigation.
 */
export const Counters: Story = {
  args: {
    counter: true,
  },
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const pagination = await canvas.findByLabelText("Page controls", {}, { timeout: 2000 })
    const back = await canvas.findByRole("button", { name: "previous page" }, { timeout: 2000 })
    const button1 = await canvas.findByRole("button", { name: "Page 1" })
    const button2 = await canvas.findByRole("button", { name: "Page 2" })
    await step("Has pager buttons", async () => {
      await expect(pagination).not.toHaveAttribute("hidden")
      await expect(button1).toBeInTheDocument()
      await expect(button1).toHaveAttribute("aria-current", "page")
      await expect(button2).toBeInTheDocument()
      await expect(button2).not.toHaveAttribute("aria-current")
    })
    await step("Navigates on click", async () => {
      await userEvent.click(button2)
      // The pagination buttons' `aria-current` and the quick-nav buttons'
      // `disabled` are both set inside the same debounced scroll handler, so
      // waiting on the former also guarantees the latter has settled.
      await waitFor(
        () => {
          expect(button1).not.toHaveAttribute("aria-current")
          expect(button2).toHaveAttribute("aria-current", "page")
          expect(back).not.toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
    })
    await step("Navigates back", async () => {
      await userEvent.click(back)
      await waitFor(
        () => {
          expect(button2).not.toHaveAttribute("aria-current")
          expect(button1).toHaveAttribute("aria-current", "page")
          expect(back).toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
      // Remove focus
      await userEvent.click(canvasElement)
    })
  },
}

/**
 * Display numbered pagination.
 */
export const Paginated: Story = {
  args: {
    pagination: true,
  },
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const pagination = await canvas.findByLabelText("Page controls", {}, { timeout: 2000 })
    const back = await canvas.findByRole("button", { name: "previous page" }, { timeout: 2000 })
    const button1 = await canvas.findByRole("button", { name: "Page 1" })
    const button2 = await canvas.findByRole("button", { name: "Page 2" })
    await step("Has pager buttons", async () => {
      await expect(pagination).not.toHaveAttribute("hidden")
      await expect(button1).toBeInTheDocument()
      await expect(button1).toHaveAttribute("aria-current", "page")
      await expect(button2).toBeInTheDocument()
      await expect(button2).not.toHaveAttribute("aria-current")
    })
    await step("Navigates on click", async () => {
      await userEvent.click(button2)
      // The pagination buttons' `aria-current` and the quick-nav buttons'
      // `disabled` are both set inside the same debounced scroll handler, so
      // waiting on the former also guarantees the latter has settled.
      await waitFor(
        () => {
          expect(button1).not.toHaveAttribute("aria-current")
          expect(button2).toHaveAttribute("aria-current", "page")
          expect(back).not.toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
    })
    await step("Navigates back", async () => {
      await userEvent.click(back)
      await waitFor(
        () => {
          expect(button2).not.toHaveAttribute("aria-current")
          expect(button1).toHaveAttribute("aria-current", "page")
          expect(back).toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
      // Remove focus
      await userEvent.click(canvasElement)
    })
  },
}

/**
 * Loop back to start when the end is reached and the next button is clicked.
 */
export const Loop: Story = {
  args: {
    loop: true,
  },
  play: async ({ canvas, canvasElement, userEvent, step }) => {
    const isMobile = matchMedia("(max-width: 767px)").matches
    const back = await canvas.findByRole("button", { name: "previous page" }, { timeout: 2000 })
    const next = await canvas.findByRole("button", { name: "next page" }, { timeout: 2000 })
    // The custom element's IntersectionObserver populates its internal item
    // map asynchronously after mount - wait for its first pass (visible via
    // the resulting `aria-hidden`) before clicking, or navigation can run
    // against an empty item map.
    await waitFor(
      () => expect(canvasElement.querySelector('[data-index="0"]')).toHaveAttribute("aria-hidden"),
      { timeout: 2000 },
    )
    await step("Has prev/next buttons", async () => {
      await expect(back).toHaveAttribute("disabled")
      await expect(next).not.toHaveAttribute("disabled")
    })
    await step("Navigates on click", async () => {
      await userEvent.click(next)
      await waitFor(
        () => {
          expect(back).not.toHaveAttribute("disabled")
          expect(next).not.toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
      await userEvent.click(next)
      await waitFor(
        () => {
          expect(back).not.toHaveAttribute("disabled")
          expect(next).not.toHaveAttribute("disabled")
        },
        { timeout: 2000 },
      )
      if (!isMobile) {
        // With `loop`, `next` is never `disabled` at the end - the custom
        // element instead marks it `data-restart` once its debounced scroll
        // handler has confirmed the end was reached. Wait for that marker
        // before the "Loops back" step's click, or it can race the debounce
        // and request an out-of-range page.
        await waitFor(() => expect(next).toHaveAttribute("data-restart"), { timeout: 2000 })
      }
    })
    await step("Loops back", async () => {
      if (!isMobile) {
        await userEvent.click(next)
        await waitFor(
          () => {
            expect(back).toHaveAttribute("disabled")
            expect(next).not.toHaveAttribute("disabled")
          },
          { timeout: 2000 },
        )
      } else {
        // On mobile there's too many pages to click through to so we just
        // click back instead to restore the initial state. The desktop
        // test covers the loop functionality and the behaviour is the same.
        await userEvent.click(back)
        await userEvent.click(back)
        await waitFor(
          () => {
            expect(back).toHaveAttribute("disabled")
            expect(next).not.toHaveAttribute("disabled")
          },
          { timeout: 2000 },
        )
      }
      // Remove focus
      await userEvent.click(canvasElement)
    })
  },
}
