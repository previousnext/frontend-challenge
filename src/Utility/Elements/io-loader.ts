/**
 * Lazy Load on an Intersection Observer
 */

export default class IntersectionLoader {
  el: HTMLElement
  callback: () => any
  controller: AbortController
  observer: IntersectionObserver
  fallbackBtn?: HTMLButtonElement
  errorMsg?: HTMLElement

  constructor(el: HTMLElement, callback: () => any) {
    this.el = el
    this.callback = callback
    this.fallbackBtn = this.el.querySelector("[data-load-fallback]")
    this.errorMsg = this.el.querySelector("[data-load-error]")
    this.controller = new AbortController()
  }

  init = (): void => {
    this.observer = new IntersectionObserver(items => {
      items.forEach(({ isIntersecting }) => {
        if (isIntersecting) this.load().catch(error => this.handleError(error))
      })
    })
    this.observer.observe(this.el)
    const { signal }: AbortController = this.controller
    this.fallbackBtn?.addEventListener("click", this.handleClick, { signal })
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
    this.observer.disconnect()
    this.controller.abort()
  }

  handleClick = (): void => {
    this.load().catch(error => this.handleError(error))
  }

  handleError = (error): void => {
    if (process.env.NODE_ENV !== "production") console.error(error) // eslint-disable-line no-console
    this.errorMsg?.removeAttribute("hidden")
  }

  static create = (selector: string, callback: () => any): void => {
    if (!Object.hasOwn(window, "once")) return
    window.once("intersection-loader", selector)?.forEach((el: HTMLElement): void => {
      const loader: IntersectionLoader = new IntersectionLoader(el, callback)
      loader.init()
    })
  }
}
