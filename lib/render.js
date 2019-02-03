const extend = require('deepmerge');
const fm = require('front-matter');
const path = require('path');
const fs = require('fs');
const through = require('through2');
const stripBom = require('strip-bom');
const processRoot = require('./processRoot');

module.exports = function() {
  return through.obj(render.bind(this));
};

/**
 * Renders a page with a layout. The page also has access to any loaded partials, helpers, or data.
 * @param {object} file - Vinyl file being parsed.
 * @param {string} enc - Vinyl file encoding.
 * @param {function} cb - Callback that passes the rendered page through the stream.
 */
function render(file, enc, cb) {
  'use strict';

  try {
    // Get the HTML for the current page and layout
    let page = fm(stripBom(file.contents.toString()));

    // DEV: at this point, page = the raw page.html content

    // Determine which layout to use
    let basePage = path.basename(file.path);
    let basePath = path.relative(this.options.root, path.dirname(file.path));

    let layoutKey = basePath;
    if (basePath === "") {
        layoutKey = path.basename(file.path);
    }

    // get general layout using key from object of layouts
    let layout = page.attributes.layout || (this.pageLayouts && this.pageLayouts[layoutKey]) || "default";

    // if there is a match for the single specific file, then override general layout
    if  (this.pageLayouts && this.pageLayouts[basePage]) {
        layout = this.pageLayouts[basePage];
    }

    let layoutTemplate = this.layouts[layout];

    if (this.debug) {
        console.log ("base:      " + basePath);
        console.log ("page:      " + basePage);
        console.log ("file path: " + file.path);
        console.log ("layoutkey: " + layoutKey);
        console.log ("layout:    " + layout);
        console.log ("page.attributes.layout: " + page.attributes.layout);
        console.log ("this.pageLayouts: ", this.pageLayouts);
    }

    if (!layoutTemplate) {
      if (layout === 'default') {
        throw new Error('Panini error: you must have a layout named "default".');
      }
      else {
        throw new Error('Panini error: no layout named "'+layout+'" exists.');
      }
    }

    // Now create Handlebars templates out of them
    let pageTemplate = this.Handlebars.compile(page.body + '\n');
    // DEV: at this point, page.body = the page.html content, with linebreaks, etc. but NOT RENDERED YET

    // Build page data with globals
    let pageData = extend({}, this.data);

    // Add any data from stream plugins
    pageData = (file.data) ? extend(pageData, file.data) : pageData;

    // Add this page's front matter
    pageData = extend(pageData, page.attributes);

    // Finish by adding panini-specific constants to the page context
    pageData = extend(pageData, {
      page: path.basename(file.path, '.html'),
      filepath: file.path,
      layout: layout,
      root: processRoot(file.path, this.options.root)
    });

    // Add special ad-hoc partials for #ifpage and #unlesspage
    this.Handlebars.registerHelper('ifpage', require('../helpers/ifPage')(pageData.page));
    this.Handlebars.registerHelper('unlesspage', require('../helpers/unlessPage')(pageData.page));

    // Finally, add the page as a partial called "body", and render the layout template
    this.Handlebars.registerPartial('body', pageTemplate);
    // DEV: pageTemplate(pageData) = the rendered page !!!!!

    // extend the page data object with the rendered page-body contents
    // so that it can be accessed as part of the page data
    pageData = extend(pageData, {
      pageRendered: pageTemplate(pageData),
    });

    file.contents = new Buffer(layoutTemplate(pageData));

  }
  catch (e) {
    if (layoutTemplate) {
      // Layout was parsed properly so we can insert the error message into the body of the layout
      this.Handlebars.registerPartial('body', 'Panini: template could not be parsed <br> \n <pre>{{error}}</pre>');
      file.contents = new Buffer(layoutTemplate({ error: e }));
    }
    else {
      // Not even once - write error directly into the HTML output so the user gets an error
      // Maintain basic html structure to allow Livereloading scripts to be injected properly
      file.contents = new Buffer('<!DOCTYPE html><html><head><title>Panini error</title></head><body><pre>'+e+'</pre></body></html>');
    }

    throw new Error('Panini: rendering error occured.\n' + e);
  }
  finally {
    // This sends the modified file back into the stream
    cb(null, file);
  }
}
