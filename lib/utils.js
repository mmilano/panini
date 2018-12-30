const glob = require('glob');
const path = require('path');

/**
 * Load a set of files
 * @param  {string|array} dir
 * @param  {string}       pattern
 * @return {array}
 */
exports.loadFiles = function(dir, pattern) {
  'use strict';
  let files = [];

  dir = !Array.isArray(dir) ? [dir] : dir;

  for (var i in dir) {
    files = files.concat(glob.sync(path.join(process.cwd(), dir[i], pattern)));
  }

  return files;
};