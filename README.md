# Technical Challenge: Frontend Developer

## Overview

Implement a modal dialog component using the codebase provided.

## The task

Using the existing codebase as your starting point, implement a modal dialog component. A rough reference for behaviour
and appearance can be found here: [stripe.com](https://stripe.com/au) (see expand icon on homepage cards).

Implementation should fit the patterns and conventions already established in the codebase.

## What to submit

- [x] See the [CONTRIBUTING.md](./CONTRIBUTING.md) file for setup instructions and guidelines.

## Process

- [x] Read through task 10:30 and plan
- [x] Onboard & check
  - [x] pnpm audit - (PMG) notes critical npm packages: look at --fix
- [x] Plan 30m and Discovery
  - [x] need to install oxc.oxc-vscode formatter to match code styles.

- [x] Run tests on current code.
  - [x] `pnpm test` - worked - [x] `pnpm lint` - Found 40 errors in 4 files.

```
  Errors  Files
  10  src/elements.ts:3
  1  src/Utility/Elements/breakpoint-loader.ts:75
  1  src/Utility/Elements/io-loader.ts:58
  28  src/Utility/Elements/keyboard.ts:7
```

- [x] `pnpm test`

```
    Snapshots  1 failed
    Test Files  11 failed | 28 passed (39)
    Tests  57 failed | 54 passed (111)
```

Deciding to move on...

- find components and read through current component/theme implementations
- [x] Stripe example Components used
  - [x] Buttons with arrow icon and links
  - [x] Expand / Close icons
  - [x] Grids: 2/3, 1/3, full
  - [x] Cards and backgrounds
  - [x] Text, quotes, logo, headings

- [x] Ideation 30m - decide on way forward
  - [x] Can I use dialog element?
    - [x] But if the implementation should be written in TypeScript - then change to div and custom open/close.

- [x] Iterate
  - [x] Test assumptions
  - [x] Create storybook component
  - [x] Style a Story.
  - [x] Check Accessibility
  - [x] Add modifiers for Dialog storybook component
  - [] Make a Story with multiple dialogs to test open / close of each on a page.
  - [] Style dialogs on a page and ::backdrop.
  - [ ] update snapshots & Write interaction tests
  - [x] docs
  - [x] commits

## Requirement checklist

The dialog should:

- [x] Open and close correctly
- [x] Avoid using any external UI libraries - we'd like to see your own implementation
- [x] Be keyboard accessible - including Escape to close,
- [ ] And correct focus management when opening and closing
- [1/2] Follow the existing component patterns, naming conventions, and file structure in the codebase
- [x] Be written in TypeScript << GOT STUCK HERE on the open / closer functions >>

- [] Mobile behaviour and breakpoints
- [x] I'd want to fix main background, so scroll only affects the content of the dialog when open
- [] Animation and transition behaviour
- [x] How the trigger element is handled

- [x] Run tests, linters
- [x] Docs
- [x] Commit

## Submission

- Any assumptions you made where the spec was unclear
  - [x] whether to use dialog element
    - https://caniuse.com/?search=dialog
    - https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog > Global 96.86%
  - [] or latest popover with polyfills for browsers not yet compatible.
  - [x] But suggestion is to use TypeScript, so will do a more manual custom dialog

- Any trade-offs or decisions you'd approach differently with more time
- [x] Anything you noticed in the existing codebase you'd flag in a code review
  - The format/linter changes semi quotes back to double quotes
  - I'd get more familiar with the available utility styles and colours and spacing css vars.
  - NPM packages security audit - 1 critical package

- [x] include a README (this):

https://github.com/stewest/frontend-challenge
