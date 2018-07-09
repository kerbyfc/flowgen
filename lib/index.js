"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _compiler = require("./cli/compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _beautifier = require("./cli/beautifier");

var _beautifier2 = _interopRequireDefault(_beautifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  beautify: _beautifier2.default,
  compiler: _compiler2.default
};