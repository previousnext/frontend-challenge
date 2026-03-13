import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./twig/section-background.twig"
import "./section.css"
import { Section as SectionType, Image as ImageType } from "@pnx-mixtape/ids-shape"
import { BackgroundStyles } from "../../enums"
import SectionStories from "./Section.stories"

// Deps.
import Image from "../../Atom/Image/image.twig"

type MxSectionType = SectionType & {
  image?: ImageType
}

/**
 * Section can have a background image.
 */
const meta: Meta<MxSectionType> = {
  tags: ["autodocs"],
  component: Component,
  args: {
    ...SectionStories.args,
    image: Image({
      src: "https://picsum.photos/id/56/1642/560?grayscale",
      alt: "Blurry bubbles",
    }),
  },
  argTypes: {
    ...SectionStories.argTypes,
    image: {
      description: "[Image](/?path=/docs/atom-image--docs) component.",
      control: "text",
      table: {
        type: { summary: "Image" },
      },
    },
  },
}

export default meta
type Story = StoryObj<MxSectionType>

export const Background: Story = {}

export const Dark: Story = {
  args: {
    background: BackgroundStyles.REVERSE,
  },
}
