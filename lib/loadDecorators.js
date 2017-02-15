'use strict';

var fs   = require('fs');
var path = require('path');
var utils = require('./utils');

/**
 * Looks for files with the .js extension within the given directory, and attempts to add them as Handlebars decorators.
 * @param {string} dir - Folder to check.
 */
module.exports = function(dir) {

    // allow for the files to be located within the panini options root location
    // var fullDir = this.options.root + dir;
    // var decorators = utils.loadFiles(fullDir, '**/*.js');

    var decorators = utils.loadFiles(dir, '**/*.js');
  
  for (var i in decorators) {
    var decorator;
    var name = path.basename(decorators[i], '.js');

    try {
      if (this.Handlebars.decorators[name]){
        delete require.cache[require.resolve(path.join(decorators[i]))];
        this.Handlebars.unregisterDecorator(name);
      }

      decorator = require(path.join(decorators[i]));
//       decorator = fs.readFileSync(path.join(decorators[i]));
      this.Handlebars.registerDecorator(name, decorator);
    }
    catch (e) {
      console.warn('Error when loading ' + name + '.js as a Handlebars decorator.');
    }
  }
  
    if (this.debug) {
        console.log("-------");
        console.log("Decorators: ");
        
        for (var i in this.Handlebars.decorators) {
            console.log ("* " + i);
        }
        console.log("\n");
    }
    
}
