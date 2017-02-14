'use strict';

var fs    = require('fs');
var path  = require('path');
var utils = require('./utils');

/**
 * output the current info for the file being generated
 * @param {boolean} debug - true or false
 */
module.exports = function(dir) {
    console.log ("debug");
    var buffer = [];
  
    debug = this.debug;

    function log(file, o) {

        o.forEach(function (el) {
            var key = el[0];
            var value = el[1] || '';

            if (typeof value !== 'string') {
                value = columns(Object.keys(value), options);
            }

            buffer.push('    ' + key + ':');
            buffer.push(value.replace(/^/gm, '      '));
        });

        console.log('  ' + file.relative);
        console.log(buffer.join('\n'));
        console.log();
    }

    if (debug) {
        log(file, [
            ['global data', wax.context],
            ['local data', data],
            ['decorators', hb.decorators],
            ['helpers', hb.helpers],
            ['partials', hb.partials]
        ]);
    }

}
