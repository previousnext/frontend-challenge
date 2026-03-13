import { beforeAll, afterEach, expect } from "vitest"
import { page } from "vitest/browser"
import { setProjectAnnotations } from "@storybook/html-vite"
import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview"
import * as previewAnnotations from "./preview"

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const annotations = setProjectAnnotations([previewAnnotations, a11yAddonAnnotations])

beforeAll(annotations.beforeAll)

afterEach(async () => {
  await new Promise(resolve => window.requestIdleCallback(resolve))
  const pageEl = page.getByTestId("page")?.element()
  if (!pageEl) return

  // Find all elements with aria attributes or react-aria names
  const selector =
    '[aria-controls],[aria-labelledby],[aria-owns],[aria-describedby],[name^="react-aria"]'
  const els = Array.from(pageEl.querySelectorAll(selector))

  const attributes = ["aria-controls", "aria-labelledby", "aria-describedby", "aria-owns", "name"]

  // Collect the original IDs
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
  if (ids.length) {
    ids.forEach((id, ix) => {
      const idElements = pageEl.querySelectorAll(`[id="${id}"]`)
      idElements.forEach(el => {
        el.setAttribute("id", `unique-${ix}`)
      })
    })
  }

  const element = pageEl.innerHTML
  // eslint-disable-next-line no-standalone-expect
  expect(element).toMatchSnapshot()
})
