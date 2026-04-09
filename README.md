# Technical Challenge: Frontend Developer

## Overview

Decided (for speed!) to lean on the web platforms modern [invoker command API](https://developer.mozilla.org/en-US/docs/Web/API/Invoker_Commands_API) to achieve a feature complete dialog device. I've used this approach on a number of projects in production recently, utilising a few polyfills (not included in this submission).

> Any assumptions you made where the spec was unclear

What content we should expect to render inside the dialog - for this submission I assumed other components, a Card in this case.

> Any trade-offs or decisions you'd approach differently with more time

- Much like the Stripe implementation, I'd endeavour to focus trap users inside the dialog where they can use the escape and 🅧 controls to close.
- I chose to use a Button component as the dialog trigger. Perhaps with more time I could explore augmenting other components with dialog triggering wrappers (much like the stripe.com example).
- I wanted to experiment with anchor positioning of the 🅧 button in the dialog, ideally I'd like it to remain fixed / non-scrollable with the content, but note the stripe.com example's 🅧 device _does_ scroll away, so stopped short.
- Perhaps the dialog variant is a little restrictive, maybe a set of modifiers would've been a better approach (peel from top, left, right)
- I have feelings around thumbable 🅧 buttons in dialogs on handheld devices - perhaps I'd move the close component to the bottom right on smaller viewports / containers.

> Anything you noticed in the existing codebase you'd flag in a code review

Noticed one of the accordion tests were failing - an unexpected disabled attribute, perhaps rendered with javascript?


