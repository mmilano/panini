/* jshint esversion: 6 */  // allow es6 features

var hljs = require('highlight.js');
var marked = require('marked');

/**
 * Handlebars block helper that converts Markdown to HTML.
 * The code blocks in the markdown are rendered with the syntax highlighting.
 * @param {object} options - Handlebars object.
 * @example
 * {{#markdown}}Welcome to [zombo.com](http://zombo.com){{/markdown}}
 * @returns The Markdown inside the helper, converted to HTML.
 */
 module.exports = function(options) {
    let markOptions = {
        gfm: true
    };

   var renderer = new marked.Renderer();

   renderer.code = function(code, language) {
     if (typeof language === 'undefined') language = 'html';

     var renderedCode = hljs.highlight(language, code).value;
     let output = `<div class="code-example"><pre><code class="${language}">${renderedCode}</code></pre></div>`;

     return output;
   };

   // marked.setOptions(markOptions);
   return marked(options.fn(this), { renderer });
 };