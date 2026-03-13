import { Meta, StoryObj } from "@storybook/html-vite"
import Component from "./button.twig"
import Icon from "../Icon/icon.twig"
import "./button.css"
import { Button as ButtonType, ButtonModifiers, ButtonTypes } from "@pnx-mixtape/ids-shape"
import { Icons } from "../../enums"

/**
 * A button atom with optional icon.
 */
const meta: Meta<ButtonType> = {
  tags: ["autodocs", "ids-mvp"],
  component: Component,
  args: {
    title: "Button",
    as: ButtonTypes.BUTTON,
  },
  argTypes: {
    title: {
      description: "The button label",
      type: {
        name: "string",
        required: true,
      },
    },
    as: {
      description: "Choose the type of button, or use a link instead.",
      options: Object.values(ButtonTypes),
      control: "select",
      table: {
        defaultValue: { summary: ButtonTypes.BUTTON },
        type: { summary: "enum" },
      },
    },
    href: {
      description: "When using a Link, set the `href` value.",
      type: "string",
      if: { arg: "as", eq: ButtonTypes.LINK },
    },
    modifiers: {
      description:
        "Define the style of the button. **outline** and **full-width** can be used with the other colour options.",
      options: Object.values(ButtonModifiers),
      control: "multi-select",
      table: {
        type: { summary: "enum" },
      },
    },
    disabled: {
      description: "Add the `[disabled]` attribute to the button.",
      type: "boolean",
      table: { defaultValue: { summary: "false" } },
      if: { arg: "as", neq: ButtonTypes.LINK },
    },
    iconStart: {
      description:
        "An [Icon](/?path=/docs/atom-icon--docs) object, to display **before** the title.",
      table: {
        subcategory: "Icon",
      },
    },
    iconEnd: {
      description:
        "An [Icon](/?path=/docs/atom-icon--docs) object, to display **after** the title.",
      table: {
        subcategory: "Icon",
      },
    },
    iconOnly: {
      description:
        "When an icon is added, visually hide the button text so that only the icon is displayed.",
      control: "boolean",
      table: {
        defaultValue: { summary: "false" },
        subcategory: "Icon",
      },
    },
  },
}

export default meta
type Story = StoryObj<ButtonType>

export const Button: Story = {}

/**
 * Primary style uses the **dark** modifier.
 */
export const Dark: Story = {
  args: {
    modifiers: [ButtonModifiers.DARK],
  },
}

/**
 * Outline can be combined with the **dark** or **destructive** modifier.
 */
export const Outline: Story = {
  args: {
    modifiers: [ButtonModifiers.DARK, ButtonModifiers.OUTLINE],
  },
}

/**
 * Buttons can look more like hyperlinks by using the **light** modifier.
 */
export const Light: Story = {
  args: {
    modifiers: [ButtonModifiers.LIGHT],
  },
}

/**
 * Destructive style should be reserved for cancel or delete buttons.
 */
export const Destructive: Story = {
  args: {
    modifiers: [ButtonModifiers.DESTRUCTIVE],
  },
}

/**
 * White style is useful when on a dark background or overlaying an image.
 */
export const White: Story = {
  args: {
    modifiers: [ButtonModifiers.WHITE],
  },
  globals: {
    background: "mx-background--alt",
  },
}

/**
 * Button's can be a hyperlink element, though this usage should be limited (or combined with the **light** modifier).
 */
export const Link: Story = {
  args: {
    as: ButtonTypes.LINK,
    href: "#",
  },
}

/**
 * Icons can be added after the button text.
 */
export const IconEnd: Story = {
  args: {
    iconEnd: Icon({
      icon: Icons.ARROW_RIGHT,
    }),
  },
}

/**
 * Icons can be added before the button text.
 */
export const IconStart: Story = {
  args: {
    iconStart: Icon({
      icon: Icons.ARROW_LEFT,
    }),
  },
}

/**
 * Or the icon can visually hide the button text.
 */
export const IconOnly: Story = {
  args: {
    iconStart: Icon({
      icon: Icons.SEARCH,
    }),
    iconOnly: true,
  },
}
