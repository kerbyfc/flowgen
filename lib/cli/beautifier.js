"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = beautify;

var _prettier = require("prettier");

var _prettier2 = _interopRequireDefault(_prettier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function beautify(str) {
  return _prettier2.default.format(str);
}