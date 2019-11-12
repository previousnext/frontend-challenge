/**
 * @file
 * Defines tasks for styles, cleaning, linting, kss, and watching.
 */

'use strict';

import gulp from 'gulp';
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import del from 'del';
import sass from 'gulp-sass';
import sassGlob from 'gulp-sass-glob';
import sourcemaps from 'gulp-sourcemaps';
import eyeglass from 'eyeglass';
import autoprefixer from 'gulp-autoprefixer';
import size from 'gulp-size';
import sassLint from 'gulp-sass-lint';
import eslint from 'gulp-eslint';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import kss from 'kss';
import browserSync from 'browser-sync';

// Import the gulpfile config.
let config = {};
try {
  // At this stage we are only using one gulpfile.yml.
  // If the need arrises to have developer overrides for gulp config we can do this.
  config = yaml.safeLoad(fs.readFileSync('gulpfile.yml', 'utf8'), {json: true});
} catch (e) {
  console.log('gulpfile.yml not found!');
}

// node-sass / eyeglass global config.
config.sassOptions = {
  includePaths: [
    config.sass.src
  ],
  outputStyle: 'expanded',
};

// The scss files we are compiling.
let sassFiles = [
  config.sass.src + '/**/*.scss',
  // Ignore partials.
  '!' + config.sass.src + '/**/_*.scss',
  // Ignore styleguide sass files.
  '!' + config.sass.src + '/style-guide/**/*.scss',
]

// Define the globs to clean (or leave alone).
let cleanFiles = {
  css: [
    config.sass.dest + '/**/*.css',
    config.sass.dest + '/**/*.map',
    // Don't delete styleguide css files as these are handled by the styleguide cleaner.
    '!' + config.sass.dest + '/style-guide/**/*.css'
  ],

  styleguide: [
    config.styleguide.dest + '/*.html',
    config.styleguide.dest + '/kss-assets',
    config.sass.dest + '/style-guide',
  ]
}

// The actual files to lint (or ignore).
let lintFiles = {
  js: config.js.src + '/**/*.js',

  sass: [
    config.sass.src + '/**/*.scss'
  ]
}

// Ensure KSS CSS paths are relative to the styleguide. Unless they are external.
let kssCssFiles = [];
if (config.styleguide.cssFiles) {
  kssCssFiles = config.styleguide.cssFiles.map(c => c.startsWith('http') ? c : path.relative(config.styleguide.dest, c));
}

// Ensure KSS JS paths are relative to the styleguide. Unless they are external.
let kssJsFiles = [];
if (config.styleguide.jsFiles) {
  kssJsFiles = config.styleguide.jsFiles.map(j => j.startsWith('http') ? j : path.relative(config.styleguide.dest, j));
}

// Kss config.
let kssOptions = {
  source: [
    config.sass.src,
    config.sass.dest + '/style-guide/'
  ],
  destination: config.styleguide.dest,
  builder: config.styleguide.builder,
  css: kssCssFiles,
  js: kssJsFiles,
  homepage: 'homepage.md',
  title: config.styleguide.title
};

// The Kss scss files to compile.
let kssSassFiles = [
  config.sass.src + '/style-guide/**/*.scss',
  '!' + config.sass.src + '/style-guide/chroma-kss-markup.scss'
];

// Files to watch for changes.
let watchFiles = {
  sass: [
    config.sass.src + '/**/*.scss',
    // Don't watch the styleguide sass files, these are watched by the styleguide task.
    '!' + config.sass.src + '/style-guide/**/*.scss'
  ],

  js: config.js.src + '/**/*.js',

  styleguide: [
    config.sass.src + '/**/*.twig',
    config.sass.src + '/style-guide/**/*.scss',
    config.sass.src + '/style-guide/**/*.md',
  ]
}

// Watch options.
let watchOptions = {
  usePolling: true
}

/**
 * Start Browsersync.
 */
const bsInit = function(done) {
  browserSync.init({
    open: true,
    server: {
      baseDir: config.httpRoot
    }
  });
  done();
}

bsInit.description = 'Start Browsersync.';
gulp.task('browsersync:init', bsInit);

/**
 * Reload Browsersync.
 */
const bsReload = function(done) {
  browserSync.reload();
  done();
}

bsReload.description = 'Reload Browsersync.';
gulp.task('browsersync:reload', bsReload);

/**
 * Lint Sass.
 */
const lintSass = function() {
  return gulp.src(lintFiles.sass)
    .pipe(sassLint())
    .pipe(sassLint.format());
};

lintSass.description = 'Lints all Sass src files.';
gulp.task('lint:sass', lintSass);

/**
 * Lint JS.
 */
const lintJs = function() {
  return gulp.src(lintFiles.js)
    .pipe(eslint())
    .pipe(eslint.format());
};

lintJs.description = 'Lints all JS src files.';
gulp.task('lint:js', lintJs);

/**
 * Run both linters in series.
 */
const lint = gulp.series('lint:sass', 'lint:js');
lint.description = 'Lint Sass and JS.';
gulp.task('lint', lint);

/**
 * Clean the SASS destination directory, except styleguide styles.
 */
const cleanCss = function() {
  return del(cleanFiles.css, { force: true });
};

cleanCss.description = 'Clean the SASS destination directory.';
gulp.task('clean:css', cleanCss);

/**
 * Clean the styleguide directory and remove any related styleguide files.
 */
const cleanStyleguide = function() {
  return del(cleanFiles.styleguide, { force: true });
};

cleanStyleguide.description = 'Clean the styleguide directory and remove any related styleguide files.';
gulp.task('clean:styleguide', cleanStyleguide);

/**
 * Outputs CSS and sourcemaps.
 */
const stylesDev = function() {
  return gulp.src(sassFiles)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass(eyeglass(config.sassOptions)).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.sass.dest))
    .pipe(browserSync.stream({ match: '**/*.css' }));
};

stylesDev.description = 'Output CSS and sourcemaps for development use only.';
gulp.task('styles:development', gulp.series('clean:css', stylesDev));

/**
 * Outputs CSS only.
 */
const stylesProd = function() {
  return gulp.src(sassFiles)
    .pipe(sassGlob())
    .pipe(sass(eyeglass(config.sassOptions)).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(size({ showFiles: true, showTotal: false }))
    .pipe(gulp.dest(config.sass.dest));
};

stylesProd.description = 'Outputs CSS ready for production.';
gulp.task('styles:production', gulp.series('clean:css', stylesProd));

/**
 * Outputs Styleguide CSS.
 */
const kssStyles = function() {
  return gulp.src(kssSassFiles)
    .pipe(sassGlob())
    .pipe(sass(eyeglass(config.sassOptions)).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.sass.dest + '/style-guide'));
};

kssStyles.description = 'Compiles sass/style-guide.';
gulp.task('styleguide:styles', kssStyles);

/**
 * Outputs Chroma KSS Markup.
 */
const chromaKssMarkup = function() {
  return gulp.src(config.sass.src + '/style-guide/chroma-kss-markup.scss')
    .pipe(sass(eyeglass(config.sassOptions)).on('error', sass.logError))
    .pipe(replace(/(\/\*|\*\/)\n/g, ''))
    .pipe(rename('chroma-kss-markup.twig'))
    .pipe(gulp.dest(config.sass.dest + '/style-guide'));
};

chromaKssMarkup.description = 'Compiles Chroma KSS markup.';
gulp.task('styleguide:chroma-kss-markup', chromaKssMarkup);

/**
 * Outputs the styleguide.
 */
const kssBuild = function() {
  return kss(kssOptions);
}

kssBuild.description = 'Builds the style guide.';
gulp.task('styleguide:build', kssBuild);

/**
 * Run all styleguide tasks in the correct order.
 */
const styleguide = gulp.series('clean:styleguide', 'styleguide:chroma-kss-markup', gulp.parallel('styleguide:styles', 'styleguide:build'));
styleguide.description = 'Builds the style guide and compiles sass/styleguide and Chroma markup.';
gulp.task('styleguide', styleguide);

/**
 * Watch sass files.
 *
 * Rather than doing a full reload of browserSync, the sass watcher will inject
 * CSS (see styles:development inside styles.js). This is a compromise
 * so you can get instant soft-refreshes to see changes to CSS rapidly. However
 * if you make changes to styleguide comments inside a sass file, browserSync
 * won't automatically reload even though the html has changed. You'll need
 * to manually reload in those cases.
 */
const watchSass = function(e) {
  gulp.watch(watchFiles.sass, watchOptions, gulp.series('styles:development', 'styleguide', 'lint:sass'));
}

watchSass.description = 'Watch scss files and rebuild styles and the styleguide, with linting.';
gulp.task('watch:sass', watchSass);

/**
 * Watch js files.
 *
 * Reload browserSync automatically after a change to a js file.
 */
const watchJs = function(e) {
  gulp.watch(watchFiles.js, watchOptions, gulp.series('lint:js', 'browsersync:reload'));
};

watchJs.description = 'Watch js files and lint them.';
gulp.task('watch:js', watchJs);

/**
 * Watch styleguide twig/sass files.
 *
 * Reload browserSync automatically after a change to a twig file.
 */
const watchStyleguide = function(e) {
  gulp.watch(watchFiles.styleguide, watchOptions, gulp.series('styleguide', 'browsersync:reload'));
};

watchStyleguide.description = 'Watch twig files and rebuild the styleguide.';
gulp.task('watch:styleguide', watchStyleguide);

/**
 * Watch all.
 */
const watch = gulp.series('styles:development', 'styleguide', 'browsersync:init', 'lint', gulp.parallel('watch:sass', 'watch:js', 'watch:styleguide'));
watch.description = 'Watch styles, js and styleguide files and rebuild as needed on change.';
gulp.task('watch', watch);

/**
 * Build for production and fail on a linting error.
 */
const build = gulp.series('styles:production', 'styleguide');
build.description = 'Build all styles and styleguide (for production).';
gulp.task('build', build);

// Set the default task to build.
gulp.task('default', build);
