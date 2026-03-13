/**
 * Class for a generic Disclosure Widget.
 */
import { makeAnchor } from "../utilities"

type DisclosureWidgetOptions = {
  attribute?: string
  shouldPreventDefault?: boolean
  setInitialAttribute?: boolean
  clickEvent?: "click" | "mouseover"
}

export type DisclosureWidgetEvent = {
  isOpen: boolean
  id: string
  options: DisclosureWidgetOptions
  target: Element
}

export default class DisclosureWidget {
  options: DisclosureWidgetOptions
  context: Document | Element
  trigger: Element & { disclosureWidget?: DisclosureWidget }
  element: Element
  id: string
  isOpen?: boolean
  attached?: boolean

  constructor(
    trigger: Element,
    element: Element,
    overrides?: DisclosureWidgetOptions,
    context: Element | Document = document,
  ) {
    if (!trigger) {
      throw new Error("toggle is required.")
    }
    if (!element) {
      throw new Error("element is required.")
    }
    const options: DisclosureWidgetOptions = {
      attribute: "inert",
      shouldPreventDefault: true,
      setInitialAttribute: true,
      clickEvent: "click",
    }

    this.options = { ...options, ...overrides }
    this.context = context || document
    this.trigger = trigger
    this.element = element
    this.id = this.element.id || this.generatedId()
  }

  init = (): void => {
    if (Object.prototype.hasOwnProperty.call(this.trigger, "disclosureWidget")) return
    const { attribute, setInitialAttribute } = this.options
    this.trigger.disclosureWidget = this
    if (setInitialAttribute) this.element.setAttribute(attribute, "")
    this.attach()
  }

  handleToggle = (): void => {
    const { attribute, setInitialAttribute } = this.options
    this.element.toggleAttribute(attribute)
    const hasAttribute: boolean = this.element.hasAttribute(attribute)
    this.isOpen = setInitialAttribute ? !hasAttribute : hasAttribute
    this.trigger.setAttribute("aria-expanded", String(this.isOpen))
    const newEvent: CustomEvent<DisclosureWidgetEvent> = new CustomEvent("disclosure-toggle", {
      bubbles: true,
      cancelable: true,
      detail: {
        isOpen: this.isOpen,
        id: this.id,
        options: this.options,
        target: this.element,
      },
    })
    this.trigger.dispatchEvent(newEvent)
  }

  handleMouse = (event: MouseEvent): void => {
    const { currentTarget, type, relatedTarget } = event

    if (type === "mouseover" || type === "mouseout") {
      const triggerParent = this.trigger.parentNode
      if (triggerParent !== currentTarget || triggerParent.contains(relatedTarget as HTMLElement))
        return
    } else if (this.trigger !== currentTarget) return

    const { shouldPreventDefault } = this.options
    this.handleToggle()
    if (shouldPreventDefault) {
      event.preventDefault()
      event.stopPropagation()
    }
  }

  handleKeyboard = (event: KeyboardEvent): void => {
    const { key, target } = event
    if (this.trigger !== target) return
    const { isOpen } = this
    const { shouldPreventDefault } = this.options

    switch (key) {
      // Down/Enter should open it.
      case "ArrowDown":
      case "Enter":
        if (!isOpen) this.handleToggle()
        if (shouldPreventDefault) event.preventDefault()
        break

      // Up/Esc should close it.
      case "ArrowUp":
      case "Escape":
        if (isOpen) this.handleToggle()
        if (shouldPreventDefault) event.preventDefault()
        break

      default:
        break
    }
  }

  attach = (): void => {
    if (this.attached) return
    const { clickEvent } = this.options
    if (clickEvent === "mouseover") {
      const parent = this.trigger.parentNode
      parent.addEventListener("mouseover", this.handleMouse)
      parent.addEventListener("mouseout", this.handleMouse)
    } else {
      this.trigger.addEventListener("click", this.handleMouse)
    }
    this.trigger.addEventListener("keydown", this.handleKeyboard)

    this.trigger.setAttribute("aria-expanded", "false")
    if (!this.trigger.hasAttribute("aria-controls"))
      this.trigger.setAttribute("aria-controls", this.id)
    this.attached = true
  }

  detach = (): void => {
    if (!this.attached) return
    if (this.isOpen) {
      this.handleToggle()
    }
    const { clickEvent } = this.options
    if (clickEvent === "mouseover") {
      const parent = this.trigger.parentNode
      parent.removeEventListener("mouseover", this.handleMouse)
      parent.removeEventListener("mouseout", this.handleMouse)
    } else {
      this.trigger.removeEventListener("click", this.handleMouse)
    }
    this.trigger.removeEventListener("keydown", this.handleKeyboard)

    this.trigger.removeAttribute("aria-expanded")
    this.attached = false
  }

  generatedId = (): string => {
    const string: string | undefined = this.trigger?.textContent?.trim()
    return !string ? "" : makeAnchor(string)
  }
}
