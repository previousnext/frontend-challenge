/**
 * Dialog
 * @file Support opening on hash, adding an ID attribute and toggling on print.
 */

import { makeAnchor } from "../../../Utility/utilities"

export default class Dialog extends HTMLElement {
  internals_: ElementInternals
  controller: AbortController

  constructor() {
    super()
    this.internals_ = this.attachInternals()
    this.controller = new AbortController()
  }

  connectedCallback(): void {
    if (!this.dialogElement || !this.trigger) return

    const { signal }: AbortController = this.controller

    document.addEventListener("click", this.handleToggle, {
      signal,
    })

    this.handleHash()

    document.addEventListener("hashchange", this.handleHash, { signal })
  }

  disconnectedCallback(): void {
    this.controller.abort()
  }

  handleToggle = (): void => {
    if (!this.dialogElement) return

    // This was temporary - wanted to make a open close function.
    if (this.dialogElement.dataset.state === "closed") {
      this.dialogElement.setAttribute("data-state", "open")
    } else {
      this.dialogElement.setAttribute("data-state", "closed")
    }
  }

  handleClose = (): void => {
    if (!this.closer) return
  }

  handleHash = (): void => {
    const { hash }: Location = window.location
    if (hash && hash === `#${this.dialogElement?.id}`) {
      this.handleToggle()
    }
  }

  get dialogElement(): HTMLElement | null {
    const dialogElement: HTMLElement | null = this.querySelector(".mx-dialog__element")

    if (!dialogElement) {
      throw new Error(`${this.localName} must contain an element with .mx-dialog__element class.`)
    }
    dialogElement.id = dialogElement.id || this.generatedId()
    return dialogElement
  }

  get trigger(): HTMLElement | null {
    const trigger: HTMLElement | null = this.querySelector(".mx-dialog__toggle")

    if (!trigger) {
      throw new Error(`${this.localName} must contain an element with class="mx-dialog__toggle">.`)
    }
    return trigger
  }

  get closer(): HTMLElement | null {
    const closer: HTMLElement | null = this.querySelector(".mx-dialog__element__close")

    if (!closer) {
      throw new Error(
        `${this.localName} must contain an element with class="mx-dialog__element__close">.`,
      )
    }
    return closer
  }

  generatedId = (): string => {
    const string: string | undefined = this.trigger?.textContent?.trim()
    return !string ? "" : makeAnchor(string)
  }
}

if (!customElements.get("mx-dialog")) customElements.define("mx-dialog", Dialog)

declare global {
  interface HTMLElementTagNameMap {
    "mx-dialog": Dialog
  }
}
