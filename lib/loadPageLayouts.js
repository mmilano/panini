
const fs      = require('fs');
const path    = require('path');
var utils   = require('./utils');

const parseGlob = require('parse-glob');
const glob = require('glob');

/**
 * handle page layout options
 * @param {object} pageLayouts - object of presets for page layouts; originally from the options passed to panini
 *
 * example:
 *   pageLayouts: {
 *      // All pages within and below /path will use the template.html layout
 *      'directory': 'template'
*    }
*/

// allow specification of arbitrary directories.
// if there is a glob definition, then get that, and continue to parse.
// otherwise, simple

module.exports = function(pageLayouts) {
    'use strict';

//     console.log ("find page layouts: ", pageLayouts, "\n");
    var contents;

    let pageLayoutMap = {};
    let root = this.options.root;

    function addPageLayout (d, t) {
        pageLayoutMap[d] = t;
    }

  for (var dir in pageLayouts) {

    // the template name to be used for items in the given directory
    var template = pageLayouts[dir];

    // break down the path of the directory
    var pathBreakdown = parseGlob(dir);
//     console.log ("path breakdown:", pathBreakdown);

    if (pathBreakdown.is.glob) {
        // if the path given is a glob, then get all the contents of the directory, and build the mapping table to include
        // all of the contents specified by the glob.

        // basePath will be the folder path, without the globbing from the end
        var basePath = pathBreakdown.base;

        // first, need to add the top level item itself
        addPageLayout (basePath, template);
        // get all the stuff under this location
        // add root so that it is fully qualified.
        // contents will be an array of paths, all have the fully qualified path
        contents = glob.sync((root + dir), {mark: false});

        // get all the files here
        //var list = utils.loadFiles(base, g);
//         console.log ("looking for: GLOB: " + pathBreakdown.base + " -- " + pathBreakdown.glob);
//         console.log ("list: ", list);
//         console.log ("\n");
//         console.log ("matches: ", contents);

        for (var i in contents) {
            let item = contents[i];

            try {
                // console.log (i + " -- " + item);

                if (fs.lstatSync(item).isDirectory()) {
                    // strip out the root path
                    item = item.replace(root, "");
                    addPageLayout (item, template);
                }
            }
            catch(e) {
                console.warn('Error when attempting to access ' + item + ' for layouts.');
            }
        }

    } else {
        // not a GLOB,
        // so just use original; ignore all the other stuff

        contents = glob.sync((root + dir), {mark: false});
        // console.log ("matches: ", contents);
        addPageLayout (dir, template);
        // addPageLayout (contents, template);
    }
  }

    // processing finished. now set the global of pageLayouts = the constructed mapping table
    this.pageLayouts = pageLayoutMap;
};