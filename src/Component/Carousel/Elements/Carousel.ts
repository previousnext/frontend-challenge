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
  itemMap?: Map<HTMLLIElement, boolean>
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
    if (!this.list) return
    if (this.buttons) this.buttons.hidden = false

    this.activePage = 0
    this.list.scrollLeft = 0
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
    this.list.addEventListener("scroll", this.handleScroll, { signal })

    if (this.pagination) {
      this.paginationType = this.pagination.getAttribute("data-pagination") as
        | "pagination"
        | "counter"

      this.pagination.addEventListener("click", this.handlePagination, {
        signal,
      })
    }

    const items: NodeListOf<HTMLLIElement> = this.list.querySelectorAll(":scope > li")
    this.itemMap = new Map()
    this.iO = new IntersectionObserver(
      entries => {
        entries.forEach(({ target, intersectionRatio }) => {
          const li = target as HTMLLIElement
          if (intersectionRatio > 0.5) {
            li.removeAttribute("inert")
            this.itemMap.set(li, true)
          } else {
            li.setAttribute("inert", "")
            this.itemMap.set(li, false)
          }
        })
      },
      {
        root: this.list,
        threshold: 0.5,
      },
    )
    items.forEach(item => this.iO.observe(item))

    this.rO = new ResizeObserver(entries => {
      entries.forEach(() => this.handleOverflow())
    })
    this.rO.observe(this.list)

    this.mO = new MutationObserver(entries => {
      entries.forEach(() => this.handleOverflow())
    })
    this.mO.observe(this.list, { childList: true })
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
    if (!this.pagination) this.activePage = page
    if (page === 0 || (hasRestart && goesForward && type === "arrow")) {
      // Scroll to the start.
      this.items[0].scrollIntoView({ inline: "start", block: "center" })
      this.next.removeAttribute("data-restart")
      return
    }
    // Scroll to the first item of a page.
    this.items[this.visibleCount * page].scrollIntoView({
      inline: "start",
      block: "center",
    })
    if (hasRestart && !goesForward) this.next.removeAttribute("data-restart")
  }

  handleDisabled = () => {
    let isEnd = false
    if (this.prev) this.prev.disabled = this.list.scrollLeft < 200
    if (this.next || this.pagination) {
      isEnd =
        Math.round(this.list.scrollLeft) >=
        Math.round(this.list.scrollWidth - this.list.offsetWidth)
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
      const startPosition = Math.round(this.list.offsetLeft + this.list.scrollLeft)
      if (isEnd) {
        // If it's the end, the last page is active.
        this.activePage = this.pageStartItems.length - 1
      } else {
        // Otherwise when the start of a page reaches the start of it's container, then set it to the active page.
        this.pageStartItems.forEach((item, index) => {
          if (Math.round(item.offsetLeft) === startPosition) this.activePage = index
        })
      }

      this.pagination.querySelectorAll("button").forEach(button => {
        const index = button.getAttribute("data-index")
        if (!index) return
        const page = parseInt(index, 10)
        button.disabled = page === this.activePage
      })
    }
  }

  handleScroll = () => {
    clearTimeout(this.debounced)
    this.debounced = setTimeout(this.handleDisabled, this.pagination ? 100 : 200)
  }

  handleOverflow = () => {
    const { scrollWidth, clientWidth } = this.list
    const hasOverflow = scrollWidth > clientWidth
    this.list.classList.toggle("overflowing", hasOverflow)
    if (hasOverflow) {
      if (this.pagination) {
        // Timeout needed for this.itemMap to get populated by i0.
        this.ioTimeout = setTimeout(this.buildPagination, 200)
      }
      this.list.setAttribute("tabindex", "0")
    } else {
      this.list.removeAttribute("tabindex")
    }
  }

  buildPagination = () => {
    if (!this.pagination.hidden) {
      // Existing pagination
      const currentPages = this.pagination.querySelectorAll(":scope > li")
      if (currentPages.length === this.pageStartItems.length) return
      // If the number of pages changes, remove current ones so it can be rebuilt.
      currentPages.forEach(li => li.remove())
    }
    const pages = Array.from({ length: this.pageStartItems.length }).fill(null)
    if (pages.length <= 0) return
    pages.forEach((_, index) => {
      const li = createElement(
        `<li><button type="button" data-index="${index}">${index + 1}</button>`,
      )
      this.pagination.append(li)
      pages[index] = li
    })
    const firstPage = pages[0] as HTMLLIElement
    firstPage.querySelector("button").disabled = true
    this.pagination.hidden = false
  }

  handlePagination = (event: MouseEvent) => {
    const target = event.target as HTMLButtonElement
    const index = target.getAttribute("data-index")
    if (!index || !validators.integer(index, 0)) return
    const page: number = parseInt(index, 10)
    this.handleNavigation(page, "pagination")
  }

  get list(): HTMLUListElement | null {
    const list: HTMLUListElement | null = this.querySelector(":scope > ul")
    if (!list) {
      throw new Error(`${this.localName} must contain a <ul> element.`)
    }
    return list
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

  get items(): HTMLLIElement[] {
    return [...this.itemMap.keys()]
  }

  get visibleCount(): number {
    return [...this.itemMap.values()].filter(visible => visible).length
  }

  get pageStartItems(): HTMLLIElement[] {
    return [...this.items].filter((_, index) => index % this.visibleCount === 0)
  }
}

if (!customElements.get("mx-carousel")) customElements.define("mx-carousel", Carousel)

declare global {
  interface HTMLElementTagNameMap {
    "mx-carousel": Carousel
  }
}
