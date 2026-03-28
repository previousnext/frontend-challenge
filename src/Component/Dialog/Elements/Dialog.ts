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
    if (!this.dialogElement || !this.openTrigger || !this.closerTigger) return

    const { signal }: AbortController = this.controller

    document.addEventListener("click", this.handleClick, {
      signal,
    })

    document.addEventListener("keydown", event => {
      if (event.code === "Escape") {
        this.handleClose()
      }
    })

    this.handleHash()

    document.addEventListener("hashchange", this.handleHash, { signal })
  }

  disconnectedCallback(): void {
    this.controller.abort()
  }

  handleClick = ({ target }) => {
    if (target === this.openTrigger) {
      this.handleOpen()
    }
    if (target === this.closerTigger) {
      this.handleClose()
    }
  }

  handleOpen = (): void => {
    this.dialogElement.setAttribute("data-state", "open")
  }

  handleClose = (): void => {
    this.dialogElement.setAttribute("data-state", "closed")
  }

  handleHash = (): void => {
    const { hash }: Location = window.location
    if (hash && hash === `#${this.dialogElement?.id}`) {
      this.handleOpen()
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

  get openTrigger(): HTMLElement | null {
    const trigger: HTMLElement | null = this.querySelector(".mx-dialog__toggle button")

    if (!trigger) {
      throw new Error(`${this.localName} must contain an element with .mx-dialog__toggle>.`)
    }
    return trigger
  }

  get closerTigger(): HTMLElement | null {
    const trigger: HTMLElement | null = this.querySelector(".mx-dialog__element__close button")

    if (!trigger) {
      throw new Error(
        `${this.localName} must contain an element with class mx-dialog__element__close>.`,
      )
    }
    return trigger
  }

  generatedId = (): string => {
    const string: string | undefined = this.openTrigger?.textContent?.trim()
    return !string ? "" : makeAnchor(string)
  }
}

if (!customElements.get("mx-dialog")) customElements.define("mx-dialog", Dialog)

declare global {
  interface HTMLElementTagNameMap {
    "mx-dialog": Dialog
  }
}
