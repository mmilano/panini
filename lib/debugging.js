'use strict';

var path  = require('path');

module.exports = function() {
        
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
        // which is empty (for now)
    };
    
    function displayLayouts() {
        heading("Layouts: ");
        for (var i in this.layouts) {
            output("- " + i);
        }
        closing();
    };

    function displayPageLayouts() {
        heading("Page Layouts: ");
        if (this.pageLayouts) {        
            for (var i in this.pageLayouts) {
                output("- " + i);
            };
        } else {
            output("[no specified page layouts]");
        };
        closing();
    };

    function displayPartials() {
        heading("Partials: ");
        if (this.Handlebars.partials) {        
            for (var i in this.Handlebars.partials) {
                output("> " + i);
            }
        } else {
            output("[no partials]");
        };
        closing();
    };

    function displayDecorators() {
        heading("Decorators: ");
        if (this.Handlebars.decorators) {        
            for (var i in this.Handlebars.decorators) {
                output("* " + i);
            };
        } else {
            output("[no decorators]");
        };
        closing();
    };

    function displayHelpers() {
        // list out all of the available helpers
        // 1. built in helpers
        // 2. custom helpers
        heading("Helpers: ");
        if (this.Handlebars.helpers) {        
            for (var i in this.Handlebars.helpers) {
                output("+ " + i);
            };
        } else {
            output("[no helpers]");
        };
        closing();
    };

    function displayData() {
        heading("Data: ");
        if (this.Handlebars.data) {
            for (var i in this.Handlebars.data) {
                output(i);
            };
        } else {
            output("[no data]");
        };
        closing();
    };

    function debughelp() {
        console.log("THIS -------");
        for (var i in this) {
            console.log ("+ " + i + " : " + this[i]);
        }
    };

    displayLayouts.call(this);
    displayPageLayouts.call(this);
    displayPartials.call(this);
    displayDecorators.call(this);
    displayHelpers.call(this);
    displayData.call(this);
    console.log ("\n");    
}
