'use strict';

var extend = require('deepmerge');
var fm = require('front-matter');
var path = require('path');
const fs = require('fs');
var through = require('through2');
var stripBom = require('strip-bom');
var processRoot = require('./processRoot');

module.exports = function() {
  return through.obj(render.bind(this));
}

/**
 * Renders a page with a layout. The page also has access to any loaded partials, helpers, or data.
 * @param {object} file - Vinyl file being parsed.
 * @param {string} enc - Vinyl file encoding.
 * @param {function} cb - Callback that passes the rendered page through the stream.
 */
function render(file, enc, cb) {
  try {
    // Get the HTML for the current page and layout
    var page = fm(stripBom(file.contents.toString()));

    // console.log ("render: page:", page);  // DEV. outputs the raw page.html content
    var pageData;

    // Determine which layout to use

    var basePage = path.basename(file.path);
    var basePath = path.relative(this.options.root, path.dirname(file.path));

    var layoutKey = basePath;
    if (basePath === "") {
        layoutKey = path.basename(file.path);
    }

    // get general layout using key from object of layouts
    var layout = page.attributes.layout || (this.pageLayouts && this.pageLayouts[layoutKey]) || "default";

    // if there is a match for the single specific file, then override general layout
    if  (this.pageLayouts && this.pageLayouts[basePage]) {
        layout = this.pageLayouts[basePage];
    }

    var layoutTemplate = this.layouts[layout];

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
    var pageTemplate = this.Handlebars.compile(page.body + '\n');
    // console.log ("render: pagebody:", page.body);  // DEV. outputs the page.html content, with linebreaks, etc.

    var pageData;

    // Build page data with globals
    pageData = extend({}, this.data);

    // Add any data from stream plugins
    pageData = (file.data) ? extend(pageData, file.data) : pageData;

    // Add this page's front matter
    pageData = extend(pageData, page.attributes);

    // Finish by adding constants
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
    // console.log ("render: layout:", pageTemplate(pageData));  // DEV. !!!!! outputs the rendered page !!!!!
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
