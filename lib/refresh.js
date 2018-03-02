'use strict';

var path = require('path');

/**
 * Initializes a Panini instance by setting up layouts.
 * If pagelayouts, partials, decorators, helpers, or data were configured, those are set up as well.
 * If layout, partial, decorator, helper, or data files ever change, this method can be called again to update the Handlebars instance.
 */
module.exports = function() {
    this.loadLayouts(this.options.layouts);
    this.loadPageLayouts(this.options.pageLayouts || '!*');
    this.loadPartials(this.options.partials || '!*');
    this.loadDecorators(this.options.decorators || '!*');
    this.loadHelpers(this.options.helpers || '!*');
    this.loadData(this.options.data || '!*');

    // debug hook
    if (this.debug) {
        this.debugging();
    }
}
