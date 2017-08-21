# Panini

[![Build Status](https://travis-ci.org/zurb/panini.svg?branch=master)](https://travis-ci.org/zurb/panini) [![npm version](https://badge.fury.io/js/panini.svg)](https://badge.fury.io/js/panini) [![Coverage Status](https://coveralls.io/repos/zurb/panini/badge.svg?branch=master&service=github)](https://coveralls.io/github/zurb/panini?branch=master) [![Dependency Status](https://david-dm.org/zurb/panini.svg)](https://david-dm.org/zurb/panini)

A super simple flat file generator for use with Gulp. It compiles a series of HTML **pages** using a common **layout**. These pages can also include HTML **partials**, external Handlebars **helpers**, or external **data** as JSON or YAML.

Panini isn't a full-fledged static site generator&mdash;rather, it solves the very specific problem of assembling flat files from common elements, using a templating language.

## Installation


**Note: This version of panini is not currently available via NPM, so installation must be done manually.**

1. git clone/download locally
1. within the local directory, npm link this version
1. within your project, npm link **TO** the local version.


See the [original panini](https://github.com/zurb/panini) for info about NPM installation.


## Usage

Feed Panini a stream of HTML files, and get a delicious flattened site out the other end.

```js
var gulp = require('gulp');
var panini = require('panini');

gulp.task('default', function() {
  gulp.src('pages/**/*.html')
    .pipe(panini({
      root: 'pages/',
      layouts: 'layouts/',
      partials: 'partials/',
      helpers: 'helpers/',
      data: 'data/',
      debug: 1
    }))
    .pipe(gulp.dest('build'));
});
```

Note that Panini loads layouts, partials, helpers, and data files once on first run. Whenever these files change, call `panini.refresh()` to get it up to date. You can easily do this inside a call to `gulp.watch()`:

```js
gulp.watch(['./src/{layouts,partials,helpers,data}/**/*'], [panini.refresh]);
```

## Options

### `root`

**Type:** `String`

Path to the root folder all pages live in. This option does not pull in the files themselves for processing&mdash;that's what `gulp.src()` is for. This setting tells Panini what the common root of your site's pages is.

### `layouts`

**Type:** `String`

Path to a folder containing layouts. Layout files can have the extension `.html`, `.hbs`, or `.handlebars`. One layout must be named `default`. To use a layout other than the default on a specific page, override it in the Front Matter on that page.

```html
---
layout: post
---

<!-- Uses layouts/post.html as the template -->
```

All layouts have a special Handlebars partial called `body` which contains the contents of the page.

```html
<!-- Header up here -->
{{> body}}
<!-- Footer down here -->
```

### `pageLayouts`

**Type:** `Object`

A list of presets for page layouts, grouped by folder. This allows you to automatically set all pages within a certain folder to have the same layout.

The pagelayout item accepts the glob "\*\*/*" to specify subfolders.

```js
panini({
  root: 'src/pages/',
  layouts: 'src/layouts/',
  pageLayouts: {
    // All pages inside src/pages/blog will use the blog.html layout
    'blog': 'blog',
    // All pages in src/pages/article AND BELOW will use the article.html layout
    'article**/*': 'article'
  }
})
```

### `partials`

**Type:** `String`

Path to a folder containing HTML partials. Partial files can have the extension `.html`, `.hbs`, or `.handlebars`. Each will be registered as a Handlebars partial which can be accessed using the name of the file. (The path to the file doesn't matter&mdash;only the name of the file itself is used.)

```html
<!-- Renders partials/header.html -->
{{> header}}
```

### `helpers`

**Type:** `String`

Path to a folder containing Handlebars helpers. Handlebars helpers are `.js` files which export a function via `module.exports`. The name used to register the helper is the same as the name of the file.

For example, a file named `markdown.js` that exports this function would add a Handlebars helper called `{{markdown}}`.

```js
var marked = require('marked');

module.exports = function(text) {
  return marked(text);
}
```

### `decorators`

**Type:** `String`

Path to a folder containing Handlebars decorators. Handlebars decorators are `.js` files which export a function via `module.exports`. The name used to register the decorator is the same as the name of the file.

For example, a file named `formatter.js` that exports this function would add a Handlebars decorator called `{{* formatter}}`.



### `data`

**Type:** `String`

Path to a folder containing external data, which will be passed in to every page. Data can be formatted as JSON (`.json`) or YAML (`.yml`). Within a template, the data is stored within a variable with the same name as the file it came from.

For example, a file named `contact.json` with key/value pairs such as the following:

```js
{
    "name": "John Doe",
    "email": "john.doe@gmail.com",
    "phone": "555-1212"
}
```

Could be used to output the value of John Doe within a template using the Handlebars syntax of `{{contact.name}}`.

Data can also be a `.js` file with a `module.exports`. The data returned by the export function will be used.

Data can also be inserted into the page itself with a Front Matter template at the top of the file.

Lastly, the reserved `page` variable is added to every page template as it renders. It contains the name of the page being rendered, without the extension.

### `debug`

**Type:** `Boolean`

Flag to have Panini display debugging information when rendering. 

Will display the known components

* layouts
* pagelayouts
* partials
* decorators
* helpers
* data

Then, for each page rendered, the base path, page name, and layout template used to render will be displayed.



## CLI

You can also use panini via the CLI.

```
Usage: panini --layouts=[layoutdir] --root=[rootdir] --output=[destdir] [other options] 'pagesglob'

Options:
  --layouts  (required) path to a folder containing layouts
  --root     (required) path to the root folder all pages live in
  --output   (required) path to the folder compiled pages should get sent to
  --partials            path to root folder for partials
  --helpers             path to folder for custom helpers (panini includes a few of its own helpers)
  --decorators          path to folder for decorators
  --data                path to folder for additional data
  --debug

the argument pagesglob should be a glob describing what pages you want to apply panini to.

Example: panini --root=src/pages --layouts=src/layouts --partials=src/partials --data=src/data --debug=true --output=dist 'src/pages/**/*.html'
```

## Local Development

```bash
git clone https://github.com/zurb/panini
cd panini
npm install
```

Use `npm test` to run tests.
