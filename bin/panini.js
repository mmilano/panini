#!/usr/bin/env node

var nopt       = require('nopt');
var pkg        = require('../package.json');
var panini     = require('../index');
var vfs        = require('vinyl-fs');
var path       = require('path');


// Options that can be passed
var options = {
  "root": String,
  "layouts": String,
  "partials": String,
  "decorators": String,
  "data": String,
  "helpers": String,
  "output": String,
  "debug": Boolean,
  "version": Boolean
};

// Shorthands for the above command options
var shorthands = {
  "r": "--root",
  "l": "--layouts",
  "p": "--partials",
  "d": "--data",
  "h": "--helpers",
  "o": "--output",
  "D": "--debug",
  "V": "--version"
};

var parsed = nopt(options, shorthands);

// cmd.args contains basic commands like "new" and "help"
// cmd.opts contains options, like --libsass and --version
var cmd = {
  args: parsed.argv.remain,
  opts: parsed
};

// No other arguments given
if (typeof cmd.args[0] === 'undefined') {
  // If -V or --version was passed, show the version of the CLI
  if (typeof cmd.opts.version !== 'undefined') {
    process.stdout.write("Panini version " + require('../package.json').version + '\n');
  }
  // Otherwise, just show the help screen
  else {
    panini.help();
  }
}

// Arguments given
else {
  vfs.src(cmd.args).
       pipe(panini(cmd.opts)).
       pipe(vfs.dest(cmd.opts.output));
}