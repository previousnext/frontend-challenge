/**
 * Accordion
 * @file Support opening on hash, adding an ID attribute and toggling on print.
 */

import { makeAnchor } from "../../../Utility/utilities"

export default class Accordion extends HTMLElement {
  internals_: ElementInternals
  controller: AbortController

  constructor() {
    super()
    this.internals_ = this.attachInternals()
    this.controller = new AbortController()
  }

  connectedCallback(): void {
    if (!this.details || !this.trigger) return

    const { signal }: AbortController = this.controller
    document.addEventListener("beforeprint", this.handleOpen, {
      signal,
    })
    document.addEventListener("afterprint", this.handleClose, {
      signal,
    })
    this.handleHash()
    document.addEventListener("hashchange", this.handleHash, { signal })
  }

  disconnectedCallback(): void {
    this.controller.abort()
  }

  handleOpen = (): void => {
    if (!this.details) return
    this.details.open = true
  }

  handleClose = (): void => {
    if (!this.details) return
    this.details.open = false
  }

  handleHash = (): void => {
    const { hash }: Location = window.location
    if (hash && hash === `#${this.details?.id}`) {
      this.handleOpen()
    }
  }

  get details(): HTMLDetailsElement | null {
    const details: HTMLDetailsElement | null = this.querySelector("details")
    if (!details) {
      throw new Error(`${this.localName} must contain a <details> element.`)
    }
    details.id = details.id || this.generatedId()
    return details
  }

  get trigger(): HTMLElement | null {
    const trigger: HTMLElement | null = this.querySelector("summary")
    if (!trigger) {
      throw new Error(`${this.localName} must contain a <summary> element.`)
    }
    return trigger
  }

  generatedId = (): string => {
    const string: string | undefined = this.trigger?.textContent?.trim()
    return !string ? "" : makeAnchor(string)
  }
}

if (!customElements.get("mx-accordion")) customElements.define("mx-accordion", Accordion)

declare global {
  interface HTMLElementTagNameMap {
    "mx-accordion": Accordion
  }
}
