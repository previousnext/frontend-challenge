/* eslint-disable no-console */
/**
 * @file utilities.
 */
import validators from "./Elements/validators"
export { default as DisclosureWidget } from "./Elements/disclosure-widget"
export type { DisclosureWidgetEvent } from "./Elements/disclosure-widget"
export { default as Keyboard } from "./Elements/keyboard"
export { default as IntersectionLoader } from "./Elements/io-loader"
export { default as BreakpointLoader } from "./Elements/breakpoint-loader"
export { validators }

export const makeAnchor = (string: string, length: number = 20): string => {
  // Validate input is a non-empty string
  if (!validators.notEmpty(string)) return ""

  // Convert the string to lowercase and remove non-alphanumeric characters.
  let id: string = string
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^-a-z0-9]/g, "")
    .replace(/[\n\r]+|[\s]{2,}/g, "")
  // Ensure we start the id with a letter.
  // Only run this several times.
  const times: number[] = [...Array(6).keys()]
  times.forEach((): void => {
    if (!id.charAt(0).match(/[a-z]/g)) {
      id = id.substring(1)
    }
  })
  // Cut to the desired length if valid.
  if (validators.integer(length, 1)) {
    id = id.substring(0, length)
  }

  return id
}

export const makeCamelCase = (string: string): string => {
  // Validate input is a non-empty string
  if (!validators.notEmpty(string)) return ""

  const output: string = string
    .trim()
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match: string, index: number): string => {
      if (+match === 0) return ""
      return index === 0 ? match.toLowerCase() : match.toUpperCase()
    })
  return output.replace(/[^\w\s]/gi, "")
}

export const isInternalLink = (href: string, internalHostnames: string[]): boolean => {
  if (typeof href !== "string" || !href || !Array.isArray(internalHostnames)) {
    return false
  }

  try {
    const { hostname }: { hostname: string } = new URL(href)
    return window.location.hostname === hostname || internalHostnames.includes(hostname)
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error(error)
    return false
  }
}

export const createElement = (string: string): Element | null => {
  try {
    const parser = new DOMParser()
    const doc = parser.parseFromString(string, "text/html")
    return doc.body.firstElementChild
  } catch (error) {
    if (process.env.NODE_ENV !== "production") console.error(error)
    return null
  }
}

export const getElementBox = (
  element: HTMLElement,
  once: boolean = false,
  content: boolean = false,
): void => {
  const observer: ResizeObserver = new ResizeObserver(entries => {
    entries.forEach(({ contentBoxSize, borderBoxSize }) => {
      const [{ inlineSize, blockSize }] = content ? contentBoxSize : borderBoxSize
      element.style.setProperty("--inline-size", `${inlineSize.toFixed(1)}px`)
      element.style.setProperty("--block-size", `${blockSize.toFixed(1)}px`)
      if (once) observer.unobserve(element)
    })
  })
  observer.observe(element)
}

export const handleOutsideClick = (
  event: MouseEvent,
  container: HTMLElement,
  callback: () => void,
  ignored: HTMLElement[] = [],
): void => {
  const { target, clientY, clientX }: { target: EventTarget; clientY: number; clientX: number } =
    event
  // FF treating option click as outside click.
  const isOption: boolean =
    target instanceof HTMLOptionElement || target instanceof HTMLSelectElement
  // Or it's in the ignored list.

  const isIgnored: HTMLElement[] = ignored?.filter(
    item => item === target || item.contains(target as HTMLElement),
  )
  // Exit early if we can.
  if (isIgnored.length || isOption) return
  // Check if click is inside the dialog content.
  const obs: IntersectionObserver = new IntersectionObserver(([{ boundingClientRect }]) => {
    const { top, height, width, left } = boundingClientRect
    const isInDialog: boolean =
      top <= clientY && clientY <= top + height && left <= clientX && clientX <= left + width

    if (!isInDialog) {
      callback()
    }
    obs.disconnect()
  })
  obs.observe(container)
}

export const handleEscape = (event: KeyboardEvent, callback: () => void): void => {
  const { key } = event
  if (key === "Escape") {
    callback()
  }
}

/**
 * Registers a callback to run when the DOM is ready.
 *
 * If `Drupal.behaviors` is present, the callback is registered as a Drupal
 * behavior so it re-runs on AJAX page updates. Otherwise it falls back to a
 * standard `DOMContentLoaded` listener — so this works in non-Drupal projects
 * with no setup required.
 *
 * @param callback - Function to call on DOM ready. Receives the document as `this`.
 * @param name - Unique behavior key, used as the `Drupal.behaviors[name]` key.
 *
 * @example
 * loadOnReady(function () {
 *   // runs on DOMContentLoaded or Drupal AJAX attach
 * }, "myComponent")
 */
export const loadOnReady = (callback: (this: Window, ev: Event) => void, name: string): void => {
  // @ts-expect-error Drupal is a CMS global — see src/Utility/global.d.ts
  if (Object.hasOwn(window, "Drupal") && Object.hasOwn(Drupal, "behaviors")) {
    // @ts-expect-error Drupal is a CMS global — see src/Utility/global.d.ts
    Drupal.behaviors[name] = {
      attach: callback,
    }
    return
  }
  window.addEventListener("DOMContentLoaded", callback.bind(document, document))
}
