/**
 * Accordion Group
 * @file Support opening and closing all with a single toggle button.
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
    if (!this.accordions || !this.toggleTrigger) return
    this.handleToggle()
    const { signal }: AbortController = this.controller
    this.toggleTrigger.addEventListener("click", this.handleToggleAll, {
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

  /** Expands everything unless everything is already open, in which case it collapses. */
  handleToggleAll = (): void => {
    const expand = this.toggleTrigger.getAttribute("aria-expanded") !== "true"
    this.accordions.forEach(details => (details.open = expand))
    this.handleToggle()
  }

  /** The trigger reads as expanded only once every item is open. */
  handleToggle = (): void => {
    const allOpen = [...this.accordions].every(details => details.open)
    this.toggleTrigger.setAttribute("aria-expanded", String(allOpen))
  }

  get accordions(): NodeListOf<HTMLDetailsElement> | null {
    const accordions: NodeListOf<HTMLDetailsElement> | null = this.querySelectorAll("details")
    if (!accordions.length) {
      throw new Error(`${this.localName} must contain at least one <details> element.`)
    }
    return accordions
  }

  get toggleTrigger(): HTMLButtonElement | null {
    const trigger: HTMLButtonElement | null = this.querySelector("button[data-toggle-all]")
    if (!trigger) {
      throw new Error(`${this.localName} must contain a <button data-toggle-all> element.`)
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
