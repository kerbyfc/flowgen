"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classDeclaration = exports.typeReference = exports.typeDeclaration = exports.interfaceDeclaration = exports.interfaceType = exports.variableDeclaration = undefined;

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var variableDeclaration = exports.variableDeclaration = function variableDeclaration(node) {
  var declarations = node.declarationList.declarations.map(_index2.default.node.printType).join(" ");

  return "declare " + _index2.default.relationships.exporter(node) + "var " + declarations + ";";
};

var interfaceType = exports.interfaceType = function interfaceType(node) {
  var withSemicolons = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var members = node.members.map(function (member) {
    var printed = _index2.default.node.printType(member);

    if (!printed) {
      return null;
    }

    var str = "\n";

    if (member.jsDoc) {
      str += _index2.default.common.comment(member.jsDoc);
    }

    return str + printed;
  }).filter(Boolean) // Filter rows which didnt print propely (private fields et al)
  .join(withSemicolons ? ";" : ",");

  if (members.length > 0) {
    members += "\n";
  }

  return "{" + members + "}";
};

var interfaceDeclaration = exports.interfaceDeclaration = function interfaceDeclaration(nodeName, node) {
  var heritage = "";

  // If the class is extending something
  if (node.heritageClauses) {
    heritage = node.heritageClauses.map(function (clause) {
      return clause.types.map(function (type) {
        return _index2.default.relationships.namespaceProp(type.expression.text, true);
      }).join(" & ");
    }).join("");
    heritage = heritage.length > 0 ? "& " + heritage + "\n" : "";
  }

  var type = node.heritageClauses ? "type" : "interface";

  var str = "declare " + _index2.default.relationships.exporter(node) + type + " " + nodeName + _index2.default.common.generics(node.typeParameters) + " " + (type === "type" ? "= " : "") + interfaceType(node) + " " + heritage;

  return str;
};

var typeDeclaration = exports.typeDeclaration = function typeDeclaration(nodeName, node) {
  var str = "declare " + _index2.default.relationships.exporter(node) + "type " + nodeName + _index2.default.common.generics(node.typeParameters) + " = " + _index2.default.node.printType(node.type) + ";";

  return str;
};

var typeReference = exports.typeReference = function typeReference(node) {
  if (node.typeName.left && node.typeName.right) {
    return _index2.default.node.printType(node.typeName) + _index2.default.common.generics(node.typeArguments);
  }

  return _index2.default.relationships.namespaceProp(node.typeName.text, true) + _index2.default.common.generics(node.typeArguments);
};

var classDeclaration = exports.classDeclaration = function classDeclaration(node) {
  var heritage = "";

  // If the class is extending something
  if (node.heritageClauses) {
    heritage = node.heritageClauses.map(function (clause) {
      return clause.types.map(_index2.default.node.printType).join(", ");
    }).join(", ");
    heritage = heritage.length > 0 ? "mixins " + heritage : "";
  }

  var str = "declare " + _index2.default.relationships.exporter(node) + "class " + node.name.text + _index2.default.common.generics(node.typeParameters) + " " + heritage + " " + interfaceType(node, true);

  return str;
};