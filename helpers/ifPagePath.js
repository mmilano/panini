/**
 * Generates a Handlebars block helper called #ifpagepath for use in templates.
 * This helper must be re-generated for every page that's rendered, because the return value of the function is dependent on the name of the current page.
 * @param {string} pageNamePath - Name of the page to use in the helper function, can include path
 * @returns {function} A Handlebars helper function.
 */

const path = require('path');

module.exports = function(pageNamePath) {
  /**
   * Handlebars block helper that renders the content inside of it based on the current path/page.
   * this is a more extensive version of the ifPage helper, matching only if the full path/page is a match (rather than just the page name)
   * @param {string...} pages - One or more pages to check.
   * @param (object) options - Handlebars object.
   * @example
   * {{#ifpagepath './path1/index' './path2/path3/index}}This must be the path1/index page or the other path2/path3/index page{{/ifpagepath}}
   * @return The content inside the helper if path/page matches, or an empty string if not.
   */

  return function() {
    let params = Array.prototype.slice.call(arguments);
    let pages = params.slice(0, -1);
    let options = params[params.length - 1];

    let output = '';  // default output: empty string

    // loop through the array of pages that were passed in.
    // check the match based on the path
    // on first match, set the output = the block helper contents
    for (var i in pages) {
      if (pages[i] === pageName) {
        output = options.fn(this);
        break;  // end the loop on first match
      }
    }

    return output;
  };
}
