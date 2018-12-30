'use strict';

const path = require('path');
const slash = require('slash');

/**
 * Creates a string that can be prepended to a file path that needs to resolve to the root.
 *
 * in other words, a relative path of "../.." that will get from file's current directory to project root
 * @param {string} page - Path to the page.
 * @param {string} root - Path to the page root.
 * @returns {string} An empty string if the page is at the root, or a series of `../` characters if the page is in a subdirectory relative to the root.
 */
module.exports = function(page, root) {
  let pagePath = path.dirname(page);
  let rootPath = path.join(process.cwd(), root);
  let relativePath = path.relative(pagePath, rootPath);

  if (relativePath.length > 0) {
    relativePath += '/';
  }

  // On Windows, paths are separated with a "\"
  // However, web browsers use "/" no matter the platform
  return slash(relativePath);
}
