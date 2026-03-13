import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./video.twig"
import { Video as VideoType } from "@pnx-mixtape/ids-shape"

/**
 * A simple video embed atom.
 */
const meta: Meta<VideoType> = {
  tags: ["autodocs"],
  component: Component,
  args: {
    src: "https://www.youtube.com/embed/NpEaa2P7qZI",
    title: "Something from youtube",
  },
}

export default meta
type Story = StoryObj<VideoType>

export const Video: Story = {}
