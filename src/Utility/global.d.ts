declare global {
  interface Window {
    Drupal?: any
    Mixtape?: {
      Popups?: {
        id: string
        closefn: () => void
      }[]
      Menu?: {
        context?: HTMLElement
        items?: NodeListOf<HTMLAnchorElement | HTMLButtonElement>
        active?: number
      }
    }
    once?: (name: string, selector: string, context?: any) => NodeListOf<HTMLElement>
  }
}

export {}
