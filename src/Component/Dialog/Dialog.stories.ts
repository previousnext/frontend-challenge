import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./dialog.twig"
import "./dialog.css"
import { HeadingTypes } from "@pnx-mixtape/ids-shape"
import Card from "../Card/card.twig"
import "../Card/card.css"

// Deps.
import Heading from "../../Atom/Heading/heading.twig"
import Image from "../../Atom/Image/image.twig"
import { BackgroundStyles } from "../../enums"

// css
import "../Dialog/dialog.css"

export enum MxDialogVariants {
  CENTERED = "centered",
  PEELED_UP = "peeled-up",
}

export type MxDialogType = {
  variant?: MxDialogVariants[]
  id: string
  content: string
  repeatContent: number
}

const meta: Meta<MxDialogType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    id: "example-dialog",
    repeatContent: 1,
    content: Card({
      title: Heading({
        title: "Card Title",
        as: HeadingTypes.THREE,
      }),
      image: Image({
        src: "https://picsum.photos/id/56/558/418?grayscale",
        alt: "Blurry bubbles",
        width: 558,
        height: 418,
      }),
      content: "<p>Tiles are just block cards without an image.</p>",
      background: BackgroundStyles.BOX,
      variant: [MxDialogVariants.PEELED_UP],
    }),
  },
  argTypes: {
    variant: {
      description:
        "The **peeled up** variant reveals the dialog from the bottom edge of the viewport, a little like the stripe.com device. The **centered** variant reveals the dialog from the center of the viewport.",
      options: Object.values(MxDialogVariants),
      control: "radio",
      table: {
        type: { summary: "enum" },
        defaultValue: { summary: MxDialogVariants.PEELED_UP },
      },
    },
    id: {
      description:
        "Must match between the open trigger and the dialog; used for `command` / `commandfor`.",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: { 
        type: { summary: "string" },
        defaultValue: { summary: "example-dialog" },
      },
    },
    content: {
      description:
        "Body markup inside the dialog. Can be the rendered output of Card, Callout, or any other Twig partial.",
      control: "text",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "WysiwygText | Card | Callout" },
        subcategory: "Dialog content",
      },
    },
    repeatContent: {
      name: "Repeat content",
      description:
        "Renders `content` this many times inside `.mx-dialog__content`. Useful to test scrolling.",
      control: { type: "number", min: 0, step: 1 },
      type: {
        name: "number",
        required: true,
      },
      table: {
        type: { summary: "number" },
        defaultValue: { summary: "1" },
        subcategory: "Dialog content",
      },
    },
  },
}

export default meta
type Story = StoryObj<MxDialogType>

export const Dialog: Story = {}
