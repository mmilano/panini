'use strict';

var fs      = require('fs');
var path    = require('path');
var utils   = require('./utils');

var parseGlob = require('parse-glob');
var glob = require('glob');

/**
 * handle page layout options 
 * @param {object} pageLayouts - object literal of presets for page layouts. 
 *
 * example:
 *   pageLayouts: {
 *      // All pages within and below /path will use the template.html layout
 *      'path': 'template'
*    }
 */


// allow specification of arbitrary directories.
// if there is a glob definition, then get that, and continue to parse. 
// otherwise, simple


module.exports = function(pageLayouts) {

    var pageLayoutReference = {};
    var root = this.options.root;

function getfiles (dir, glob) {
    var p = dir + glob;
    
    return glob.sync(pattern, opts)

};

// var mg = new Glob(pattern, {mark: true, sync:true}, function (er, matches) {
//   console.log("matches", matches)
// })

  for (var path in pageLayouts) {
  
    var base, g;
    
    // break down the path
    var pathObject = parseGlob(path);
    
    var isGlob = pathObject.is.glob;
    if (isGlob) {
        base = root + pathObject.base;
        g = pathObject.glob;

        // get all the stuff under here
        // need to add root so that it is fully qualified
        var contents = glob.sync( (root + path), {mark: true});
        
        // contents will be an array of paths, all have the fully qualified paths
        
        
        // get all the files here
        var list = utils.loadFiles(base, g);
        console.log ("looking for: " + base + " -- " + g);
        console.log ("list: ", list);
        console.log ("\n");
        console.log ("matches: ", contents);
        
        
    } else {
        // just use original. ignore all the other stuff.
        base = path;
        
    }
    
    
    for (var i in pathObject) {
        console.log (i + ":" + pathObject[i]);
    
        
        if (typeof(pathObject[i]) == "object" ) {
            for (var x in pathObject[i]) {
                console.log (">>  " + x + ":" + pathObject[i][x]);
            }
        };
    }
    console.log ("path: " + pathObject);
    
    
//     var list = utils.loadFiles(key_path);
//     console.log ("list: " + list);
    
  }
}


// module.exports = function(dir) {
//   var layouts = utils.loadFiles(dir, '**/*.{html,hbs,handlebars}');
// 
//   for (var i in layouts) {
//     var ext = path.extname(layouts[i]);
//     var name = path.basename(layouts[i], ext);
//     var file = fs.readFileSync(layouts[i]);
//     this.layouts[name] = this.Handlebars.compile(file.toString());
//   }
// }


// given an object array of 
// key - value
// path - tempalte

// and then given a file,
// determine if the file is in any of the paths
// and then the tempalte that it should use.

// could take the original object and then make a new object that has all the subdirectories automatically generated with the template value..

// or
// could make a function that will return the right template given a file
// and then crawl through to find if any paths match....




