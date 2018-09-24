# Frontend Challenge

This challenge is designed to give you a peek into our workflow at PNX and to test your skills with the following technologies:

- Sass
- Twig
- Javascript
- kss-node

Inside the `design` folder there is a PSD file.

Inside `src/components` is a very light-weight Sass scaffold in the form of a handful of base components, some very simple utility classes and one example button module.

We'd like you to have a go at implementing as many of the components from `design/pnx.psd` as you can in 2 hours, into a living style guide (kss-node). Though the "client" has said the accordion module is their top business priority and there's no need to support IE.

It's OK if you aren't familiar with kss-node or Twig, the button example in `src/components/modules/button/` is your friend, follow it's lead.

### Outcome

We just want to see your code!
Ideally you won't use a CSS framework but can demonstrate at least some of the following:

- Understanding of [SMACCS](https://smacss.com/) architecture.
- Understanding of [BEM](http://getbem.com/naming/) naming.
- Ability to reference [kss-node](https://github.com/kss-node/kss/blob/spec/SPEC.md) specification when writing component documentation.
- Use of common Sass functions like [breakpoint](https://github.com/at-import/breakpoint)
- Ability to self-learn new Sass modules like [typey](https://github.com/jptaranto/typey) and [chroma](https://github.com/JohnAlbin/chroma).
- Use of HTML5 markup
- Use of javascript where necessary

Bonus points for:

- Use of flexbox or even CSS grids
- Optimised SVGs (we already did the logo.svg)
- Use of basic ES6
- Having fun!!

### Getting started

Firstly, please fork this repo so you can share the results of your work.

To setup your development environment, make sure you have [nvm](https://github.com/creationix/nvm#installation) which will setup `node` and `npm`.

Then run the setup tasks from inside the repository:

```
nvm install
npm install
```

Once all packages are installed, you can start developing the component library inside the style guide. Run:

```
gulp watch
```

This will build all the files inside the `src/components` directory and start the Browsersync server, opening it in your default browser.

When you make changes to a `scss`, `js`, or `twig` file the watch task will lint, rebuild and refresh Browsersync for you.

To add a custom javascript file to the styleguide edit the Gulpfile.yml and add to the styleguide.jsFiles list.

### Good luck!
