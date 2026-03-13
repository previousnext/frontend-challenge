/**
 * Class for Keyboard navigation helper.
 */

export default class Keyboard {
  constructor() {
    window.Mixtape = window.Mixtape || {}
    window.Mixtape.Popups = window.Mixtape.Popups || []
    window.Mixtape.Menu = window.Mixtape.Menu || {}
  }

  attachPopup = (id: string, closefn: () => void): void => {
    window.Mixtape.Popups.push({
      id,
      closefn,
    })
  }

  detachPopup = (id: string): void => {
    window.Mixtape.Popups = window.Mixtape.Popups.filter(item => item.id !== id)
  }

  attachMenu = (
    context: HTMLElement,
    items: NodeListOf<HTMLAnchorElement | HTMLButtonElement>,
  ): void => {
    window.Mixtape.Menu = {
      context,
      items,
    }
  }

  detachMenu = (): void => {
    window.Mixtape.Menu = null
  }

  getNextFocusableMenuItem = (active: number, back: boolean = false): number => {
    if (!back) {
      // If moving forward, it's the active index + 1, or 0 if we are at the
      // end of the menu.
      return window.Mixtape.Menu.items.length > active + 1 ? active + 1 : 0
    }
    // If moving back, it's the active index - 1, or the menu length if we
    // are at the start of the menu.
    return active === 0 ? window.Mixtape.Menu.items.length - 1 : active - 1
  }

  moveFocus = (target: HTMLElement, back: boolean = false): void => {
    if (!window.Mixtape.Menu.items) return
    let active: number = 0
    // Retrieve the active menu item by looping through the list of menu links.
    window.Mixtape.Menu.items.forEach((element, index): void => {
      if (element === target) {
        active = index
      }
    })
    let focus: number = this.getNextFocusableMenuItem(active, back)

    // Check if item is tabbable.
    // Some menus, like the secondary nav have hidden items that require a
    // toggle to be clicked before the items are tabbable. This allows invisible
    // menu items to be skipped when moving focus with the this.
    // Make sure tabbable.
    let tabbable: string = window.Mixtape.Menu.items[focus].getAttribute("tabindex")
    if (tabbable !== "-1") {
      window.Mixtape.Menu.items[focus].focus()
    } else {
      // Loop through items until we find a visible one.
      while (tabbable === "-1") {
        focus = this.getNextFocusableMenuItem(focus, back)
        tabbable = window.Mixtape.Menu.items[focus].getAttribute("tabindex")
      }
      window.Mixtape.Menu.items[focus].focus()
    }

    window.Mixtape.Menu.active = focus
  }

  handleGlobalClick = ({ target }: MouseEvent): void => {
    const activePopup = window.Mixtape.Popups
      ? window.Mixtape.Popups[window.Mixtape.Popups.length - 1]
      : null
    if (!activePopup) return

    // Click away from a popup to close it.
    // It's up to the popup class to preventDefault on it's contents to
    // stop this from being triggered.
    if (activePopup.id) {
      const popupEl: HTMLElement = document.querySelector(`#${activePopup.id}`).parentElement
      if (popupEl && (target === popupEl || popupEl?.contains(target as HTMLElement))) return
      activePopup.closefn()
    }
  }

  handleGlobalKeydown = (event: KeyboardEvent): void => {
    const activePopup = window.Mixtape.Popups
      ? window.Mixtape.Popups[window.Mixtape.Popups.length - 1]
      : null
    const target = event.target as HTMLElement

    switch (event.key) {
      // Escape always closes an open popup followed by any open popups.
      case "Escape":
        if (activePopup) {
          activePopup.closefn()
        }
        break

      // Down/Right arrows navigate focus forward, with wrapping.
      case "ArrowDown":
      case "ArrowRight":
        if (window.Mixtape.Menu?.items) {
          event.preventDefault()
          this.moveFocus(target)
        }
        break

      // Up/Left arrows navigate focus backwards, with wrapping.
      case "ArrowUp":
      case "ArrowLeft":
        if (window.Mixtape.Menu?.items) {
          event.preventDefault()
          this.moveFocus(target, true)
        }
        break

      default:
        break
    }
  }

  attachEventListeners = (signal: AbortSignal): void => {
    window.addEventListener("click", this.handleGlobalClick, {
      signal,
    })
    window.addEventListener("keydown", this.handleGlobalKeydown, {
      signal,
    })
  }
}
