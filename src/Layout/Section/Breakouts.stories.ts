import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./twig/sections-breakout.twig"
import "./section.css"
import { Section as SectionType } from "@pnx-mixtape/ids-shape"

/**
 * Example of section breakouts (to be added to main section)
 */
const meta: Meta<SectionType> = {
  tags: ["autodocs"],
  component: Component,
}

export default meta
type Story = StoryObj<SectionType>

export const Breakouts: Story = {}
