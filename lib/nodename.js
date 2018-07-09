"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getNodeName;

var _typescript = require("typescript");

function getNodeName(node) {
  return _typescript.SyntaxKind[node.kind] || node.constructor + "";
}