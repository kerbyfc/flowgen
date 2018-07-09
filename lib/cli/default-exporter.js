"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exportDefault;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Takes a path and some content and performs a write call. Simple.
 */
function exportDefault(fileName, output) {
  _fs2.default.writeFileSync(fileName, output);

  return fileName;
}