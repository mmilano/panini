'use strict';

var path  = require('path');

var debugging = function() {
        
    var output = function(s) {
        // simple output. eg. a filename
        console.log (s);
    };
    
    var heading = function(s) {
        // heading for output sections
        console.log ("----------");
        console.log (s);
    };

    var closing = function() {
        // simple closing for output sections
        console.log ("\n");
    };
    
    
    // not private

    function displayLayouts() {
        heading("Layouts: ");

        for (var i in this.layouts) {
            this.output(i);
        }
        closing();
    };

    function displayPageLayouts() {
        heading("Page Layouts: ");

        for (var i in this.pageLayouts) {
            this.output(i);
        }
        closing();
    };

    function displayPartials() {
        heading("DEBUG Partials: ");

        for (var i in this.Handlebars.partials) {
            this.output(i);
        }
        closing();
    };

    function displayData() {
        heading("Data: ");
        for (var i in this.Handlebars.data) {
            this.output(i);
        }
        closing();
    };

    // list out all of the available decorators
    function displayDecorators() {

        heading("Decorators: ");
        for (var i in this.Handlebars.decorators) {
            this.output(i);
        }
        closing();
    };
    
    function displayHelpers() {

        // list out all of the available helpers
        // 1. built in helpers
        // 2. custom helpers
        heading("Helpers: ");
        for (var i in this.Handlebars.helpers) {
            this.output(i);
        }
        closing();
    };

    function debughelp() {

        console.log("THIS -------");
        for (var i in this) {
            console.log ("+ " + i + " : " + this[i]);
        }
    };

    return {
        displaylayouts: displayLayouts,
        displayPartials: displayPartials,
        displayDecorators: displayDecorators,
        displayHelpers: displayHelpers,
        displayData: displayData,
        debughelp: debughelp
    };
    
}


module.exports = debugging();

// module.exports = function () {
//     return debugging().bind(this);
// }


// exports.logging = function(dir) {
//     console.log ("debug");
//     var buffer = [];
//   
//     debug = this.debug;
// 
//     function log(obj) {
// 
//         obj.forEach(function (el) {
//             var key = el[0];
//             var value = el[1] || '';
// 
//             if (typeof value !== 'string') {
//                 value = columns(Object.keys(value), options);
//             }
// 
//             buffer.push('    ' + key + ':');
//             buffer.push(value.replace(/^/gm, '      '));
//         });
// 
//         console.log('  ' + file.relative);
//         console.log(buffer.join('\n'));
//         console.log();
//     }
// 
// //     if (debug) {
// //         log(file, [
// //             ['global data', wax.context],
// //             ['local data', data],
// //             ['decorators', hb.decorators],
// //             ['helpers', hb.helpers],
// //             ['partials', hb.partials]
// //         ]);
// //     }
//     
//     if (debug) {
//         console.log ("debugger");
//     }
// }


