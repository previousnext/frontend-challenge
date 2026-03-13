/**
 * Accordion Group
 * @file Support opening and closing all.
 */

export default class AccordionGroup extends HTMLElement {
  internals_: ElementInternals
  controller: AbortController

  constructor() {
    super()
    this.internals_ = this.attachInternals()
    this.controller = new AbortController()
  }

  connectedCallback(): void {
    if (!this.accordions || !this.expandTrigger || !this.collapseTrigger) return
    this.handleToggle()
    const { signal }: AbortController = this.controller
    this.addEventListener("click", this.handleClick, {
      signal,
    })
    this.accordions.forEach(details =>
      details.addEventListener("toggle", this.handleToggle, {
        signal,
      }),
    )
  }

  disconnectedCallback(): void {
    this.controller.abort()
  }

  handleClick = ({ target }) => {
    if (target === this.expandTrigger) {
      this.handleExpand()
    }
    if (target === this.collapseTrigger) {
      this.handleCollapse()
    }
  }

  handleExpand = () => {
    this.accordions.forEach(detail => (detail.open = true))
    this.expandTrigger.disabled = true
    this.collapseTrigger.disabled = false
  }

  handleCollapse = () => {
    this.accordions.forEach(detail => (detail.open = false))
    this.expandTrigger.disabled = false
    this.collapseTrigger.disabled = true
  }

  handleToggle = () => {
    this.expandTrigger.disabled = [...this.accordions].every(details => details.open === true)
    this.collapseTrigger.disabled = [...this.accordions].every(details => details.open !== true)
  }

  get accordions(): NodeListOf<HTMLDetailsElement> | null {
    const accordions: NodeListOf<HTMLDetailsElement> | null = this.querySelectorAll("details")
    if (!accordions.length) {
      throw new Error(`${this.localName} must contain at least one <details> element.`)
    }
    return accordions
  }

  get expandTrigger(): HTMLButtonElement | null {
    const trigger: HTMLButtonElement | null = this.querySelector("button[data-expand]")
    if (!trigger) {
      throw new Error(`${this.localName} must contain a <button data-expand> element.`)
    }
    return trigger
  }

  get collapseTrigger(): HTMLButtonElement | null {
    const trigger: HTMLButtonElement | null = this.querySelector("button[data-collapse]")
    if (!trigger) {
      throw new Error(`${this.localName} must contain a <button data-collapse> element.`)
    }
    return trigger
  }
}

if (!customElements.get("mx-accordion-group"))
  customElements.define("mx-accordion-group", AccordionGroup)

declare global {
  interface HTMLElementTagNameMap {
    "mx-accordion-group": AccordionGroup
  }
}
