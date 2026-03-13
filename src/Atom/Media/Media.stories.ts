import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./media.twig"
import Video from "../Video/video.twig"
import Image from "../Image/image.twig"
import "../_base.css"
import { Media as MediaType, MediaAlignmentTypes } from "@pnx-mixtape/ids-shape"

/**
 * Media atom with caption and alignment options.
 */
const meta: Meta<MediaType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    item: Image({
      src: "https://picsum.photos/id/56/558/418?grayscale",
      alt: "Some blurry bubble image",
    }),
    caption: "A picsum image",
    type: "image",
  },
  argTypes: {
    item: {
      description:
        "An [Image](/?path=/docs/atom-image--docs) or [Video](/?path=/docs/atom-video--docs) object.",
      type: {
        name: "string",
        required: true,
      },
      table: {
        type: { summary: "Image | Video" },
      },
    },
    caption: {
      description: "An optional caption to display underneath.",
    },
    type: {
      description: "Clarify the item type",
      options: ["image", "video"],
      control: "check",
      table: {
        defaultValue: { summary: "image" },
      },
    },
    align: {
      description:
        "Align the image (left/right will float the image so that text can wrap around it).",
      options: Object.values(MediaAlignmentTypes),
      control: "radio",
      table: {
        type: { summary: "enum" },
      },
    },
  },
}

export default meta
type Story = StoryObj<MediaType>

export const Media: Story = {}

export const RemoteVideo: Story = {
  tags: ["autodocs"],
  args: {
    type: "video",
    caption: "A remote video",
    item: Video({
      src: "https://www.youtube.com/embed/NpEaa2P7qZI",
      title: "Something from youtube",
    }),
  },
}
