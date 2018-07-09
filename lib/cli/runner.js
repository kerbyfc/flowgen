"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _typescript = require("typescript");

var _typescript2 = _interopRequireDefault(_typescript);

var _meta = require("./meta");

var _meta2 = _interopRequireDefault(_meta);

var _beautifier = require("./beautifier");

var _beautifier2 = _interopRequireDefault(_beautifier);

var _compiler = require("./compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _defaultExporter = require("./default-exporter");

var _defaultExporter2 = _interopRequireDefault(_defaultExporter);

var _flowTypedExporter = require("./flow-typed-exporter");

var _flowTypedExporter2 = _interopRequireDefault(_flowTypedExporter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
  var writeFile = options.flowTypedFormat ? _flowTypedExporter2.default : _defaultExporter2.default;

  // No real reason to return an object here instead of combining
  // the compile function into the wrapper, but I like the API it produces.
  return {
    compile: function compile(files) {
      // Iterate all the files the user has passed in
      files.forEach(function (file, index) {
        // Get the module name from the file name
        var moduleName = getModuleNameFromFile(file);

        // The format of the output argument varies a bit based on which
        // exporting format we're using. For flow-typed, only the module name
        // is required, otherwise we use the cli arg.
        var outputFile = options.flowTypedFormat ? moduleName : options.out;

        // Get the intro text
        var intro = (0, _meta2.default)(moduleName, options.version);

        // Let the user know what's going on
        if (files.length > 3) {
          // If we're compiling a lot of files, show more stats
          var progress = Math.round(index / files.length * 100);
          process.stdout.write("\r\x1b[K");
          process.stdout.write(progress + "% | " + moduleName);
        } else {
          console.log("Parsing", moduleName);
        }

        // Produce the flow library content
        try {
          var flowDefinitions = _compiler2.default.compileDefinitionFile(file);

          // Write the output to disk
          var absoluteOutputFilePath = writeFile(outputFile, (0, _beautifier2.default)(intro + flowDefinitions));

          // Check if we should compile tests as well
          if (options.compileTests) {
            // Assume tests file is in same dir, named <filename>-tests.ts
            // Based on DD conventions
            var testFileName = _path2.default.dirname(file) + "/" + moduleName + "-tests.ts";
            var testFileOutput = _path2.default.dirname(absoluteOutputFilePath) + "/test_" + moduleName + ".js";

            // Try to compile the test file. Will fail silently if not present.
            _compiler2.default.compileTest(testFileName, testFileOutput);
          }
        } catch (e) {
          console.error("Parsing", moduleName, "failed");
          console.error(e);
        }
      });
    }
  };
};

function getModuleNameFromFile(fileName) {
  return _path2.default.basename(fileName).slice(0, -5);
}