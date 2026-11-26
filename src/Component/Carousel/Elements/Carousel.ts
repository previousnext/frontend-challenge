/**
 * Carousel
 * @file Support scrolling with buttons.
 */

import { createElement, validators } from "../../../Utility/utilities"

export default class Carousel extends HTMLElement {
  internals_: ElementInternals
  controller: AbortController
  debounced: ReturnType<typeof setTimeout>
  loop?: boolean
  paginationType?: "pagination" | "counter"
  activePage?: number
  itemMap?: Map<HTMLElement, boolean>
  iO: IntersectionObserver
  rO: ResizeObserver
  mO: MutationObserver
  ioTimeout?: ReturnType<typeof setTimeout>

  constructor() {
    super()
    this.internals_ = this.attachInternals()
    this.controller = new AbortController()
  }

  connectedCallback(): void {
    if (!this.track) return
    if (this.buttons) this.buttons.hidden = false

    this.activePage = 0
    this.track.scrollLeft = 0
    this.debounced = null
    this.loop = this.hasAttribute("loop")

    const { signal }: AbortController = this.controller
    if (this.prev) {
      this.prev.disabled = true
      this.prev.addEventListener("click", () => this.handleNavigation(this.activePage - 1), {
        signal,
      })
    }
    if (this.next)
      this.next.addEventListener("click", () => this.handleNavigation(this.activePage + 1), {
        signal,
      })
    // Sync controls once scrolling settles; the debounced scroll listener is
    // only a fallback for browsers without `scrollend`.
    if ("onscrollend" in window) {
      this.track.addEventListener("scrollend", this.handleDisabled, { signal })
    } else {
      this.track.addEventListener("scroll", this.handleScroll, { signal })
    }

    if (this.pagination) {
      this.paginationType = this.pagination.getAttribute("data-pagination") as
        | "pagination"
        | "counter"

      this.pagination.addEventListener("click", this.handlePagination, {
        signal,
      })
    }

    Array.from(this.track.children).forEach((child, index) => {
      child.setAttribute("data-index", String(index))
    })
    const items: NodeListOf<HTMLElement> = this.track.querySelectorAll("[data-index]")
    this.itemMap = new Map()
    this.iO = new IntersectionObserver(
      entries => {
        entries.forEach(({ target, intersectionRatio }) => {
          const item = target as HTMLElement
          if (intersectionRatio > 0.5) {
            item.removeAttribute("inert")
            item.setAttribute("aria-hidden", "false")
            this.itemMap.set(item, true)
          } else {
            item.setAttribute("inert", "")
            item.setAttribute("aria-hidden", "true")
            this.itemMap.set(item, false)
          }
        })
      },
      {
        root: this.track,
        threshold: 0.5,
      },
    )
    items.forEach(item => this.iO.observe(item))

    this.rO = new ResizeObserver(entries => {
      entries.forEach(() => this.handleOverflow())
    })
    this.rO.observe(this.track)

    this.mO = new MutationObserver(entries => {
      entries.forEach(() => this.handleOverflow())
    })
    this.mO.observe(this.track, { childList: true })
  }

  disconnectedCallback(): void {
    this.controller.abort()
    this.mO.disconnect()
    this.iO.disconnect()
    this.rO.disconnect()
    clearTimeout(this.debounced)
    clearTimeout(this.ioTimeout)
  }

  handleNavigation = (page: number, type: "arrow" | "pagination" = "arrow") => {
    const goesForward = page > this.activePage
    const hasRestart = this.loop && this.next.hasAttribute("data-restart")
    if (page === 0 || (hasRestart && goesForward && type === "arrow")) {
      // Reset to page 0 rather than the requested (out-of-range) page —
      // otherwise every subsequent click computes an out-of-bounds item
      // index and throws instead of scrolling.
      this.activePage = 0
      this.items[0].scrollIntoView({ inline: "start", block: "nearest" })
      this.next.removeAttribute("data-restart")
      return
    }
    this.activePage = page
    // Scroll to the first item of a page.
    this.items[this.visibleCount * page].scrollIntoView({
      inline: "start",
      block: "nearest",
    })
    if (hasRestart && !goesForward) this.next.removeAttribute("data-restart")
    const newEvent: CustomEvent<{
      page: number
      type: "arrow" | "pagination"
    }> = new CustomEvent("carousel-slide", {
      bubbles: true,
      cancelable: true,
      detail: { page: this.activePage, type },
    })
    this.dispatchEvent(newEvent)
  }

  handleDisabled = () => {
    let isEnd = false
    if (this.prev) this.prev.disabled = this.track.scrollLeft < 200
    if (this.next || this.pagination) {
      isEnd =
        Math.round(this.track.scrollLeft) >=
        Math.round(this.track.scrollWidth - this.track.offsetWidth)
    }
    if (this.next) {
      if (!this.loop) {
        this.next.disabled = isEnd
      } else if (isEnd) {
        this.next.setAttribute("data-restart", "")
      }
    }
    if (this.pagination) {
      // Set the activePage based on scroll.
      const startPosition = Math.round(this.track.offsetLeft + this.track.scrollLeft)
      if (isEnd) {
        // If it's the end, the last page is active.
        this.activePage = this.pageStartItems.length - 1
      } else {
        // Closest match, not exact equality — sub-pixel/rounding differences
        // mean an exact match can silently miss every "middle" page.
        let closestIndex = 0
        let closestDistance = Infinity
        this.pageStartItems.forEach((item, index) => {
          const distance = Math.abs(Math.round(item.offsetLeft) - startPosition)
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        })
        this.activePage = closestIndex
      }

      this.pagination.querySelectorAll("button").forEach(button => {
        const index = button.getAttribute("data-index")
        if (!index) return
        const page = parseInt(index, 10)
        const isActive = page === this.activePage
        button.disabled = isActive
        if (isActive) {
          button.setAttribute("aria-current", "page")
        } else {
          button.removeAttribute("aria-current")
        }
      })
    }
  }

  handleScroll = () => {
    clearTimeout(this.debounced)
    this.debounced = setTimeout(this.handleDisabled, this.pagination ? 100 : 200)
  }

  handleOverflow = () => {
    const { scrollWidth, clientWidth } = this.track
    const hasOverflow = scrollWidth > clientWidth
    this.track.classList.toggle("overflowing", hasOverflow)
    if (hasOverflow) {
      if (this.pagination) {
        // Timeout needed for this.itemMap to get populated by i0.
        this.ioTimeout = setTimeout(this.buildPagination, 200)
      }
      this.track.setAttribute("tabindex", "0")
    } else {
      this.track.removeAttribute("tabindex")
    }
  }

  buildPagination = () => {
    if (!this.pagination.hidden) {
      // Existing pagination
      const currentPages = this.pagination.querySelectorAll("button")
      if (currentPages.length === this.pageStartItems.length) return
      // If the number of pages changes, remove current ones so it can be rebuilt.
      currentPages.forEach(page => page.remove())
    }
    const pages = Array.from({ length: this.pageStartItems.length }).fill(null)
    if (pages.length <= 0) return
    pages.forEach((_, index) => {
      const label = index + 1
      const tab = createElement(
        "button",
        { type: "button", "data-index": `${index}`, "aria-label": `Page ${label}` },
        `${label}`,
      )
      this.pagination.append(tab)
      pages[index] = tab
    })
    const firstPage = pages[0] as HTMLButtonElement
    firstPage.disabled = true
    firstPage.setAttribute("aria-current", "page")
    this.pagination.hidden = false
  }

  handlePagination = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    const index = target.getAttribute("data-index")
    if (!index || !validators.integer(index, 0)) return
    const page: number = parseInt(index, 10)
    this.handleNavigation(page, "pagination")
  }

  get track(): HTMLDivElement | null {
    const track: HTMLDivElement | null = this.querySelector("[data-track]")
    if (!track) {
      throw new Error(`${this.localName} must contain an element with [data-track].`)
    }
    return track
  }

  get buttons(): HTMLElement | null {
    return this.querySelector("[data-buttons]")
  }

  get prev(): HTMLButtonElement | null {
    return this.buttons?.querySelector(".mx-carousel__prev")
  }

  get next(): HTMLButtonElement | null {
    return this.buttons?.querySelector(".mx-carousel__next")
  }

  get pagination(): HTMLOListElement | null {
    return this.querySelector("[data-pagination]")
  }

  get items(): HTMLElement[] {
    return [...this.itemMap.keys()]
  }

  get visibleCount(): number {
    return [...this.itemMap.values()].filter(visible => visible).length
  }

  get pageStartItems(): HTMLElement[] {
    return [...this.items].filter((_, index) => index % this.visibleCount === 0)
  }
}

if (!customElements.get("mx-carousel")) customElements.define("mx-carousel", Carousel)

declare global {
  interface HTMLElementTagNameMap {
    "mx-carousel": Carousel
  }
}
