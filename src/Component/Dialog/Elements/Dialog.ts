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
    if (!this.dialog || !this.trigger) return

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
    if (!this.dialog) return
    this.dialog.open = true
  }

  handleClose = (): void => {
    if (!this.dialog) return
    this.dialog.open = false
  }

  handleHash = (): void => {
    const { hash }: Location = window.location
    if (hash && hash === `#${this.dialog?.id}`) {
      this.handleOpen()
    }
  }

  get dialog(): HTMLDialogElement | null {
    const dialog: HTMLDialogElement | null = this.querySelector("dialog")
    if (!dialog) {
      throw new Error(`${this.localName} must contain a <dialog> element.`)
    }
    dialog.id = dialog.id || this.generatedId()
    return dialog
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

if (!customElements.get("mx-dialog")) customElements.define("mx-dialog", Dialog)

declare global {
  interface HTMLElementTagNameMap {
    "mx-dialog": Dialog
  }
}
