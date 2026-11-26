import { afterEach, expect } from "vitest"
import { page } from "vitest/browser"

export const normalizeGeneratedIds = (root: Element) => {
  const selector =
    '[aria-controls],[aria-labelledby],[aria-owns],[aria-describedby],[name^="react-aria"]'
  const els = Array.from(root.querySelectorAll(selector))
  // Find all elements with aria attributes or react-aria names
  const attributes = ["aria-controls", "aria-labelledby", "aria-describedby", "aria-owns", "name"]
  const ids: string[] = []
  // Replace attribute values with unique-${ix}
  attributes.forEach(attr => {
    els.forEach((el, ix) => {
      if (!el.hasAttribute(attr)) return
      const originalValue = el.getAttribute(attr)
      if (originalValue && !ids.includes(originalValue)) {
        ids.push(originalValue)
      }
      el.setAttribute(attr, `unique-${ix}`)
    })
  })
  // Replace the actual id attributes that match collected IDs
  ids.forEach((id, ix) => {
    root.querySelectorAll(`#${CSS.escape(id)}`).forEach(el => {
      el.setAttribute("id", `unique-${ix}`)
    })
  })
}

export const waitForIdle = () => {
  return new Promise<void>(resolve => {
    if ("requestIdleCallback" in globalThis) {
      globalThis.requestIdleCallback(() => setTimeout(resolve, 20))
      return
    }
    setTimeout(resolve, 20)
  })
}

afterEach(async () => {
  await waitForIdle()

  const root = page.getByTestId("page")?.element()
  if (!root) return

  normalizeGeneratedIds(root)

  // oxlint-disable-next-line vitest/no-standalone-expect
  expect(root.innerHTML).toMatchSnapshot()
})
