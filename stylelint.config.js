/** @type {import("stylelint").Config} */
const config = {
  extends: ["stylelint-config-standard"],
  plugins: ["stylelint-use-logical-spec"],
  rules: {
    "custom-property-empty-line-before": null,
    "layer-name-pattern": null,
    "function-no-unknown": [true, { ignoreFunctions: ["/token/", "/svg-load/"] }],
    "at-rule-no-unknown": [true, { ignoreAtRules: ["/mixin/", "/container/"] }],
    "declaration-property-value-no-unknown": [
      true,
      {
        ignoreProperties: {
          "mask-image": ["/svg-load/"],
          "background-image": ["/svg-load/"],
          "min-inline-size": ["/anchor-size/"],
        },
      },
    ],
    "no-descending-specificity": null,
    "import-notation": "string",
    "selector-class-pattern": [
      "^([a-z])([a-z0-9]+)((-[a-z0-9]+)+)?(((--)?(__)?)([a-z0-9]+)((-[a-z0-9]+)+)?)?(((--)?(__)?)([a-z0-9]+)((-[a-z0-9]+)+)?)?$",
      {
        message:
          "Expected class selector to be BEM selector matching either .block__element or .block--modifier",
      },
    ],
    "selector-nested-pattern": "^&",
    "liberty/use-logical-spec": [true, { except: ["float"] }],
  },
}

export default config
