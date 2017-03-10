# Frontend Challenge

This challenge is designed to give you a peek into our workflow at PNX and to test your skills with the following technologies:

- SASS
- Twig
- JS/jQuery
- kss-node

Inside the `design` folder there is a PSD file.

Inside `src/components` is a very light-weight SASS scaffold in the form of
a handful of base components, some very simple utility classes and one example
button component. You'll be expected to flesh this out with your own layout,
form, and module components, using a combination of SASS, twig and jQuery (where necessary).

### Outcome

1. Setup working development environment (following the instructions below).
2. Translate the provided design into a component library within a living style guide.

### Guidelines

The following guidelines should be followed:

- Timebox to one hour only!
- Follow [SMACCS](https://smacss.com/) process.
- Use [BEM](http://getbem.com/naming/) naming.
- Adhere to [kss-node](https://github.com/kss-node/kss/blob/spec/SPEC.md) specification when writing component documentation.
- Use of [breakpoint](https://github.com/at-import/breakpoint), [typey](https://github.com/jptaranto/typey) and [chroma](https://github.com/JohnAlbin/chroma) sass modules.
- Use of jQuery.

### Getting started

Firstly, please fork this repo so you can share the results of your work.

To setup your development environment, make sure you have [nvm](https://github.com/creationix/nvm#installation) and [yarn](https://yarnpkg.com/en/docs/install#mac-tab) installed locally.

Then run the setup tasks:

```
nvm install
yarn
```

Once all packages are installed, you can start developing the component library
inside the style guide. Run:

```
gulp watch
```

This will build all the files inside the `src/components` directory and start
the Browsersync server, opening it in your default browser.

When you make changes to a `scss`, `js`, or `twig` file the watch
task will lint, rebuild and refresh Browsersync for you.

### Good luck!
