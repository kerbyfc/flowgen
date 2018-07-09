"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _basics = require("./basics");

var basics = _interopRequireWildcard(_basics);

var _declarations = require("./declarations");

var declarations = _interopRequireWildcard(_declarations);

var _relationships = require("./relationships");

var relationships = _interopRequireWildcard(_relationships);

var _common = require("./common");

var common = _interopRequireWildcard(_common);

var _node = require("./node");

var node = _interopRequireWildcard(_node);

var _function = require("./function");

var functions = _interopRequireWildcard(_function);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  basics: basics,
  declarations: declarations,
  common: common,
  functions: functions,
  relationships: relationships,
  node: node
};