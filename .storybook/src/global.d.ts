declare module "*.png" {
  export default "" as string
}

declare module "*.jpg" {
  export default "" as string
}

declare module "*.svg" {
  export default "" as string
}

declare module "*.twig" {
  const content: any
  export default content
}
