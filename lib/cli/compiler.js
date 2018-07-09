"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typescript = require("typescript");

var _typescript2 = _interopRequireDefault(_typescript);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _typescriptCompiler = require("typescript-compiler");

var _typescriptCompiler2 = _interopRequireDefault(_typescriptCompiler);

var _namespaceManager = require("../namespaceManager");

var _namespaceManager2 = _interopRequireDefault(_namespaceManager);

var _parse = require("../parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compile = function compile(sourceFile) {
  var rootNode = (0, _parse.recursiveWalkTree)(sourceFile);

  var output = rootNode.getChildren().map(function (child) {
    return child.print();
  }).join("");

  return output;
};

/**
 * Compiles typescript files
 */

exports.default = {
  compileTest: function compileTest(path, target) {
    _typescriptCompiler2.default.compile(path, "--module commonjs -t ES5 --out " + target);
  },

  compileDefinitionString: function compileDefinitionString(string) {
    _namespaceManager2.default.reset();

    return compile(_typescript2.default.createSourceFile("/dev/null", string, _typescript2.default.ScriptTarget.ES6, false));
  },

  compileDefinitionFile: function compileDefinitionFile(path) {
    _namespaceManager2.default.reset();

    return compile(_typescript2.default.createSourceFile(path, _fs2.default.readFileSync(path).toString(), _typescript2.default.ScriptTarget.ES6, false));
  }
};