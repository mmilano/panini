'use strict';

const fs    = require('fs');
const path  = require('path');
var utils = require('./utils');
const yaml  = require('js-yaml');

/**
 * Looks for files with .js, .json, or .yml extensions within the given directory, and adds them as Handlebars variables matching the name of the file.
 * @param {string} dir - Folder to check for data files.
 */
module.exports = function(dir) {
  let dataFiles = utils.loadFiles(dir, '**/*.{js,json,yml}');

    if (this.debug) {
        console.log ("Data files:");
        console.log ("----------");
    }

  for (var i in dataFiles) {
    let file = fs.readFileSync(dataFiles[i]);
    let ext = path.extname(dataFiles[i]);
    let name = path.basename(dataFiles[i], ext);

    if (this.debug) {
        console.log (name);
    }

    let data;

    if (ext === '.json' || ext === '.js') {
      delete require.cache[require.resolve(dataFiles[i])];
      data = require(dataFiles[i])
    }
    else if (ext === '.yml') {
      data = yaml.safeLoad(fs.readFileSync(dataFiles[i]));
    }

    this.data[name] = data;
  }
}
