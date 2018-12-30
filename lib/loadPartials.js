'use strict';

const fs       = require('fs');
const path     = require('path');
var utils    = require('./utils');
const stripBom = require('strip-bom');

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as Handlebars partials matching the name of the file.
 * @param {string} dir - Folder to check.
*/
module.exports = function(dir) {
  let partials = utils.loadFiles(dir, '**/*.{html,hbs,handlebars}');

  for (var i in partials) {
    let ext = path.extname(partials[i]);

    // strip the file path from the name so that the programmatic partial name = just the file name
    let name = path.basename(partials[i], ext);

    let file = stripBom(fs.readFileSync(partials[i]).toString('utf8'));
    this.Handlebars.registerPartial(name, file.toString());
  }
}