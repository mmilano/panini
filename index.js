var panini;
var help = require('./lib/helpMessage');

/**
 * Initializes an instance of Panini.
 * @constructor
 * @param {object} options - Configuration options to use.
 */
function Panini(options) {

    // configuration defaults
    const defaults = {
        debug: 0
    };

  this.options = options;
  this.Handlebars = require('handlebars');
  this.layouts = {};
  this.pageLayouts = {};
  this.data = {};

  if (!options.layouts) {
    throw new Error('Panini error: you must specify a directory for layouts.');
  }

  if (!options.root) {
    throw new Error('Panini error: you must specify the root folder that pages live in.')
  }

  var debug;
  if (!options.debug) {
    debug = defaults.debug;
  }
  else {
    this.options.debug ? debug = true : debug = false;
  }
  this.debug = debug;

}

Panini.prototype.refresh = require('./lib/refresh');
Panini.prototype.loadLayouts = require('./lib/loadLayouts');
Panini.prototype.loadPageLayouts = require('./lib/loadPageLayouts');
Panini.prototype.loadPartials = require('./lib/loadPartials');
Panini.prototype.loadDecorators = require('./lib/loadDecorators');
Panini.prototype.loadHelpers = require('./lib/loadHelpers');
Panini.prototype.loadBuiltinHelpers = require('./lib/loadBuiltinHelpers');
Panini.prototype.loadData = require('./lib/loadData');
Panini.prototype.render = require('./lib/render');
Panini.prototype.debugging = require('./lib/debugging');

/**
 * Gulp stream function that renders HTML pages. The first time the function is invoked in the stream, a new instance of Panini is created with the given options.
 * @param {object} options - Configuration options to pass to the new Panini instance.
 * @returns {function} Transform stream function that renders HTML pages.
 */
module.exports = function(options) {
  if (!panini) {
    panini = new Panini(options);
    panini.loadBuiltinHelpers();
    panini.refresh();
    module.exports.refresh = panini.refresh.bind(panini);

    // expose Handlebars to the outside
    module.exports.Handlebars = panini.Handlebars;
  }

  // Compile pages with the above helpers
  return panini.render();
}

module.exports.Panini = Panini;
module.exports.refresh = function() {};
module.exports.help = function() {
  help();
};
