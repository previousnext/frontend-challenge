import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./image.twig"
import "../_base.css"
import { Image as ImageType } from "@pnx-mixtape/ids-shape"

/**
 * A simple image atom.
 */
const meta: Meta<ImageType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    src: "https://picsum.photos/id/56/558/418?grayscale",
    alt: "A picsum image",
  },
}

export default meta
type Story = StoryObj<ImageType>

export const Image: Story = {}
