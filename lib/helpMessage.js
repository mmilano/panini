
module.exports = function() {
  'use strict';
  var txt = 'Usage: panini --layouts=[layoutdir] --root=[rootdir] --output=[destdir] [other options] \'pagesglob\'\n' +
            '\n' +
            'Options: \n' +
            '  --layouts  (required) path to a folder containing layouts\n' +
            '  --root     (required) path to the root folder all pages live in\n' +
            '  --output   (required) path to the folder compiled pages should get sent to\n' +
            '  --partials            path to root folder for partials \n' +
            '  --decorators          path to root folder for custom decorators \n' +
            '  --helpers             path to folder for additional helpers \n' +
            '  --data                path to folder for additional data that pages can use during render\n' +
            '  --debug               output debug information when rendering' +

            '\n' +
            'the argument pagesglob should be a glob describing what pages you want to apply panini to.\n' +
            '\n' +
            'Example: panini --root=src/pages --layouts=src/layouts --partials=src/partials --decorators=src/decorators --data=src/data --output=dist --debug=true \'src/pages/**/*.html\'\n';

  process.stdout.write(txt);
}
