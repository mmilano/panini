/* jshint esversion: 6 */  // allow es6 features

const hljs = require('highlight.js');
const marked = require('marked');

/**
 * Handlebars block helper that converts Markdown to HTML.
 * The code blocks in the markdown are rendered with the syntax highlighting.
 * @param {object} options - Handlebars object.
 * @example
 * {{#markdown}}Welcome to [zombo.com](http://zombo.com){{/markdown}}
 * @returns The Markdown inside the helper, converted to HTML.
 */
 module.exports = function(options) {
    let markedOptions = {
        gfm: true
    };

   var renderer = new marked.Renderer();

   renderer.code = function(code, language) {
     if (typeof language === 'undefined') language = 'html';

     var renderedCode = hljs.highlight(language, code).value;
     // var renderedCode = code;  // DEV TODO: render code without highlight. disable line above.
     let output = `<div class="code-example"><pre><code class="${language}">${renderedCode}</code></pre></div>\n`;

     return output;
   };

   marked.setOptions(markedOptions);
   return marked(options.fn(this), { renderer });
 };