"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.printType = undefined;

var _typescript = require("typescript");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var printType = exports.printType = function printType(type) {
  // debuggerif()
  //TODO: #6 No match found in SyntaxKind enum
  switch (type.kind) {
    case "FunctionTypeAnnotation":
      return _index2.default.functions.functionType(type);

    case "LastNodeType":
      return "\"" + type.literal.text + "\"";
  }

  switch (_typescript.SyntaxKind[type.kind]) {
    case _typescript.SyntaxKind.VoidKeyword:
    case _typescript.SyntaxKind.StringKeyword:
    case _typescript.SyntaxKind.AnyKeyword:
    case _typescript.SyntaxKind.NumberKeyword:
    case _typescript.SyntaxKind.BooleanKeyword:
    case _typescript.SyntaxKind.NullKeyword:
    case _typescript.SyntaxKind.UndefinedKeyword:
      return _index2.default.basics.print(type.kind);

    case _typescript.SyntaxKind.FunctionType:
      return _index2.default.functions.functionType(type);

    case _typescript.SyntaxKind.TypeLiteral:
      return _index2.default.declarations.interfaceType(type);

    case _typescript.SyntaxKind.IdentifierObject:
    case _typescript.SyntaxKind.Identifier:
    case _typescript.SyntaxKind.StringLiteralType:
      return _index2.default.relationships.namespace(type.text, true);

    case _typescript.SyntaxKind.BindingElement:
    case _typescript.SyntaxKind.TypeParameter:
      return type.name.text;

    case _typescript.SyntaxKind.FirstTypeNode:
    case _typescript.SyntaxKind.LastTypeNode:
    case _typescript.SyntaxKind.TypePredicate:
      if (type.literal) {
        if (type.literal.kind === "StringLiteral") {
          return "'" + type.literal.text + "'";
        } else {
          return type.literal.text;
        }
      }

      if (type.type.typeName) {
        return type.type.typeName.text;
      }

      return printType(type.type);

    case _typescript.SyntaxKind.QualifiedName:
      return _index2.default.relationships.namespace(type.left.text) + printType(type.right) + _index2.default.common.generics(type.typeArguments);

    case _typescript.SyntaxKind.StringLiteral:
      debugger;
      return type.text;

    case _typescript.SyntaxKind.TypeReference:
      return _index2.default.declarations.typeReference(type);

    case _typescript.SyntaxKind.VariableDeclaration:
    case _typescript.SyntaxKind.PropertyDeclaration:
      if (type.modifiers && type.modifiers.some(function (modifier) {
        return modifier.kind === "PrivateKeyword";
      })) {
        return "";
      }

      if (type.parameters) {
        return type.name.text + ": " + type.parameters.map(_index2.default.common.parameter);
      }

      if (type.type) {
        return type.name.text + ": " + printType(type.type);
      }

      return type.name.text + ": ";

    case _typescript.SyntaxKind.TupleType:
      return "[" + type.elementTypes.map(printType).join(", ") + "]";

    case _typescript.SyntaxKind.MethodSignature:
      return "" + type.name.text + _index2.default.functions.functionType(type, true);

    case _typescript.SyntaxKind.ExpressionWithTypeArguments:
      return printType(type.expression) + _index2.default.common.generics(type.typeArguments);

    case _typescript.SyntaxKind.PropertyAccessExpression:
      return _index2.default.relationships.namespace(type.expression.text) + printType(type.name);

    case _typescript.SyntaxKind.NodeObject:
      return _index2.default.relationships.namespace(type.expression.text) + printType(type.name);

    case _typescript.SyntaxKind.PropertySignature:
      return _index2.default.common.parameter(type);

    case _typescript.SyntaxKind.CallSignature:
      var str = "(" + type.parameters.map(_index2.default.common.parameter).join(", ") + ")";
      return type.type ? str + ": " + printType(type.type) : str;

    case _typescript.SyntaxKind.UnionType:
      var join = type.types.length >= 5 ? "\n" : " ";
      // debugger
      return type.types.map(printType).join(join + "| ");

    case _typescript.SyntaxKind.ArrayType:
      return printType(type.elementType) + "[]";

    case _typescript.SyntaxKind.ThisType:
      return "this";

    case _typescript.SyntaxKind.IndexSignature:
      return "[" + type.parameters.map(_index2.default.common.parameter).join(", ") + "]: " + printType(type.type);

    case _typescript.SyntaxKind.IntersectionType:
      return type.types.map(printType).join(" & ");

    case _typescript.SyntaxKind.SymbolKeyword:
      // TODO: What to print here?
      return "";

    case _typescript.SyntaxKind.MethodDeclaration:
      // Skip methods marked as private
      if (type.modifiers && type.modifiers.some(function (modifier) {
        return modifier.kind === "PrivateKeyword";
      })) {
        return "";
      }

      return type.name.text + _index2.default.functions.functionType(type, true);

    case _typescript.SyntaxKind.ConstructorType:
      // Not implemented. The return is just a guess.
      return "(" + type.parameters.map(_index2.default.common.parameter).join(", ") + ") => " + _index2.default.node.printType(type.type);

    case _typescript.SyntaxKind.ConstructSignature:
      return "new " + _index2.default.functions.functionType(type, true);

    case _typescript.SyntaxKind.TypeQuery:
      return "typeof " + type.exprName.text;

    case _typescript.SyntaxKind.Constructor:
      return "constructor(" + type.parameters.map(_index2.default.common.parameter).join(", ") + "): this";

    case _typescript.SyntaxKind.ParenthesizedType:
      return "(" + printType(type.type) + ")";
  }

  var output = "\"NO PRINT IMPLEMENTED: " + type.kind + "\"";
  console.log(output);
  return output;
};

exports.default = printType;