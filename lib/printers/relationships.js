"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.namespaceProp = exports.namespace = exports.imports = exports.exporter = exports.moduleExports = undefined;

var _namespaceManager = require("../namespaceManager");

var _namespaceManager2 = _interopRequireDefault(_namespaceManager);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moduleExports = exports.moduleExports = function moduleExports(node) {
  var name = _index2.default.node.printType(node.expression);

  return "declare module.exports: typeof " + name;
};
var exporter = exports.exporter = function exporter(node) {
  var str = "";

  if (node.modifiers && node.modifiers.some(function (modifier) {
    return modifier.kind === "ExportKeyword";
  })) {
    str += "export ";
  }

  if (node.modifiers && node.modifiers.some(function (modifier) {
    return modifier.kind === "DefaultKeyword";
  })) {
    str += "default ";
  }

  return str;
};

var imports = exports.imports = function imports(node, moduleName) {
  var str = "import type ";

  if (node.default) {
    str += node.default;

    if (node.explicit.length) {
      str += ", ";
    }
  }

  if (node.explicit.length) {
    str += "{ " + node.explicit.join(", ") + " }";
  }

  str += " from '" + moduleName + "'";

  return str;
};

var namespace = exports.namespace = function namespace(name) {
  var hidePunctuation = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (_namespaceManager2.default.nsExists(name)) {
    return "" + name + (hidePunctuation ? "" : "$");
  }

  return name + (hidePunctuation ? "" : ".");
};

var namespaceProp = exports.namespaceProp = function namespaceProp(name) {
  if (_namespaceManager2.default.nsPropExists(name)) {
    return _namespaceManager2.default.getNSForProp(name) + "$" + name;
  }

  return name;
};