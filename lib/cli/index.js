#! /usr/bin/env node
"use strict";

var _parse = require("../parse");

var _runner = require("./runner");

var _runner2 = _interopRequireDefault(_runner);

var _package = require("../../package.json");

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_commander2.default.version(_package.version).option("-o --output-file [outputFile]", "name for ouput file, defaults to export.flow.js", "export.flow.js").option("--flow-typed-format", "format outut for flow-typed").option("--compile-tests", "compile any <filename>-tests.ts files found").arguments("[files...]").action(function (files, options) {
  (0, _runner2.default)({
    flowTypedFormat: options.flowTypedFormat,
    compileTests: options.compileTests,
    out: options.outputFile,
    version: _package.version
  }).compile(files);
});

_commander2.default.parse(process.argv);

if (!process.argv.slice(2).length) {
  _commander2.default.outputHelp();
}