"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.comment = exports.generics = exports.parseTypeReference = exports.parameter = undefined;

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parameter = exports.parameter = function parameter(param) {
  var left = param.name.text;
  var right = void 0;

  if (param.name.kind === "ObjectBindingPattern") {
    left = "{" + param.name.elements.map(_index2.default.node.printType).join(", ") + "}";
  }

  if (!param.type) {
    right = "<<UNKNOWN PARAM FORMAT>>";
  } else {
    right = _index2.default.node.printType(param.type);
  }

  if (param.questionToken) {
    left += "?";
  }

  if (param.dotDotDotToken) {
    left = "..." + left;
  }

  return left + ": " + right;
};
var parseTypeReference = exports.parseTypeReference = function parseTypeReference(node) {
  if (node.typeName.left && node.typeName.right) {
    return _index2.default.node.printType(node.typeName) + generics(node.typeArguments);
  }

  return node.typeName.text + generics(node.typeArguments);
};

var generics = exports.generics = function generics(types) {
  if (types && types.length) {
    return "<" + types.map(_index2.default.node.printType).join(", ") + ">";
  }

  return "";
};

var comment = exports.comment = function comment(jsdoc) {
  var blocks = jsdoc.map(function (doc) {
    var comment = (doc.comment || "").replace("\n", "\n * ");

    var tags = (doc.tags || []).map(function (tag) {
      return "\n * @" + tag.tagName.text + " " + ((tag.preParameterName || {}).text || "") + " " + tag.comment;
    });

    return comment + tags.join("");
  }).join("");

  return "\n/**\n * " + blocks + "\n*/\n";
};