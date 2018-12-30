'use strict';

const fs      = require('fs');
const path    = require('path');
var utils   = require('./utils');

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as layout files to be used by pages.
 * @param {string} dir - Folder to check.
 */
module.exports = function(dir) {
  let layouts = utils.loadFiles(dir, '**/*.{html,hbs,handlebars}');

  for (var i in layouts) {
    let ext = path.extname(layouts[i]);
    let name = path.basename(layouts[i], ext);
    let file = fs.readFileSync(layouts[i]);
    this.layouts[name] = this.Handlebars.compile(file.toString());
  }
}
