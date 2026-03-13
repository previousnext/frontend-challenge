/**
 * Lazy Load a component based on breakpoint.
 */

type BreakpointLoaderOptions = {
  mediaQuery?: string
}

export default class BreakpointLoader {
  el: HTMLElement
  callback: () => any
  controller: AbortController
  breakpoint: MediaQueryList
  options: BreakpointLoaderOptions
  fallbackBtn?: HTMLButtonElement
  errorMsg?: HTMLElement

  constructor(
    el: HTMLElement,
    callback: () => any,
    options: BreakpointLoaderOptions = { mediaQuery: "(max-width: 720px)" },
  ) {
    if (!el) {
      throw new Error("Element is null or empty.")
    }
    this.el = el
    this.callback = callback
    this.breakpoint = window.matchMedia(options.mediaQuery)
    this.options = { ...options }
    this.fallbackBtn = this.el.querySelector("[data-load-fallback]")
    this.errorMsg = this.el.querySelector("[data-load-error]")
    this.controller = new AbortController()
  }

  init = (): void => {
    this.responsiveCheck(this.breakpoint)
    const { signal }: AbortController = this.controller
    this.breakpoint.addEventListener("change", this.responsiveCheck, { signal })
    this.fallbackBtn?.addEventListener("click", this.handleClick, { signal })
  }

  responsiveCheck = ({ matches }): void => {
    matches && this.load().catch(error => this.handleError(error))
  }

  load = async (): Promise<void> => {
    try {
      await this.callback()
    } catch (error) {
      this.handleError(error)
    } finally {
      this.destroy()
    }
  }

  destroy = (): void => {
    this.controller.abort()
  }

  handleClick = (): void => {
    this.load().catch(error => this.handleError(error))
  }

  handleError = (error): void => {
    if (process.env.NODE_ENV !== "production") console.error(error) // eslint-disable-line no-console
    this.errorMsg?.removeAttribute("hidden")
  }

  static create = (
    selector: string,
    callback: () => any,
    options: BreakpointLoaderOptions = {},
  ): void => {
    if (!Object.hasOwn(window, "once")) return
    window.once("breakpoint-loader", selector)?.forEach((el: HTMLElement): void => {
      const loader: BreakpointLoader = new BreakpointLoader(el, callback, options)
      loader.init()
    })
  }
}
