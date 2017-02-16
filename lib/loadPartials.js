'use strict';

var fs    = require('fs');
var path  = require('path');
var utils = require('./utils');

/**
 * Looks for files with .html, .hbs, or .handlebars extensions within the given directory, and adds them as Handlebars partials matching the name of the file.
 * @param {string} dir - Folder to check.
 */
module.exports = function(dir) {
  var partials = utils.loadFiles(dir, '**/*.{html,hbs,handlebars}');

  for (var i in partials) {
    var ext = path.extname(partials[i]);
    // strip the file path from the name so that the programmatic partial name = just the file name
    var name = path.basename(partials[i], ext);

    var file = fs.readFileSync(partials[i]);
    this.Handlebars.registerPartial(name, file.toString() + '\n');
  }

// 
//     // console.log ("", this.debugging().debughelp());
// 
//     
//     console.log ("", this.debugging.displayPartials());

}
