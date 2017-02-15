'use strict';

var fs    = require('fs');
var path  = require('path');
var utils = require('./utils');


module.exports = function () {
/**
 * output the current info for the file being generated  ????????????
//  * @param {boolean} debug - true or false ?????????/
 */
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

    displayLayouts = function() {
        this.heading("Layouts: ");

        for (var i in this.layouts) {
            this.output(i);
        }
        this.closing();
    }


    displayPartials = function() {
        this.heading("Partials: ");

        for (var i in this.Handlebars.partials) {
            this.output(i);
        }
        this.closing();
    }

    displayData = function() {
        this.heading("Data: ");
        for (var i in this.Handlebars.data) {
            this.output(i);
        }
        this.closing();
    }

    function displayDecorators() {

        // list out all of the available decorators
        this.heading("Decorators: ");
        for (var i in this.Handlebars.decorators) {
            this.output(i);
        }
        this.closing();
    }
    
    function displayHelpers() {

        // list out all of the available helpers
        // 1. built in helpers
        // 2. custom helpers
        this.heading("Helpers: ");
        for (var i in this.Handlebars.helpers) {
            this.output(i);
        }
        this.closing();
    }

    function output(s) {
        // simple output. eg. a filename
        console.log (s);
    }   
    
    function heading(s) {
        // heading for output sections
        console.log ("----------");
        console.log (s);
    }

    function closing(t) {
        // simple closing for output sections
        console.log ("\n");
    }

    return {
        displaylayouts: displayLayouts,
        displayPartials: displayPartials,
        displayDecorators: displayDecorators,
        displayHelpers: displayHelpers,
        displayData: displayData,

    }


}