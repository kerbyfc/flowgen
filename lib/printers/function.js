"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.functionDeclaration = exports.functionType = undefined;

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var functionType = exports.functionType = function functionType(func) {
  var dotAsReturn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var params = func.parameters.map(_index2.default.common.parameter);
  var generics = _index2.default.common.generics(func.typeParameters);
  var returns = func.type ? _index2.default.node.printType(func.type) : "void";

  var firstPass = generics + "(" + params.join(", ") + ")" + (dotAsReturn ? ":" : " =>") + " " + returns;

  // Make sure our functions aren't too wide
  if (firstPass.length > 80) {
    // break params onto a new line for better formatting
    var paramsWithNewlines = "\n" + params.join(",\n");

    return generics + "(" + paramsWithNewlines + ")" + (dotAsReturn ? ":" : " =>") + " " + returns;
  }

  return firstPass;
};

var functionDeclaration = exports.functionDeclaration = function functionDeclaration(nodeName, node) {
  // each functionDeclaration gets it's own line
  var str = "declare " + _index2.default.relationships.exporter(node) + "function " + nodeName + functionType(node, true) + "\n";

  return str;
};