"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stripDetailsFromTree = exports.parseNameFromNode = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.recursiveWalkTree = recursiveWalkTree;
exports.getMembersFromNode = getMembersFromNode;

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _typescript = require("typescript");

var _typescript2 = _interopRequireDefault(_typescript);

var _node = require("./nodes/node");

var _node2 = _interopRequireDefault(_node);

var _factory = require("./nodes/factory");

var _factory2 = _interopRequireDefault(_factory);

var _namespaceManager = require("./namespaceManager");

var _namespaceManager2 = _interopRequireDefault(_namespaceManager);

var _printers = require("./printers");

var _printers2 = _interopRequireDefault(_printers);

var _nodename = require("./nodename");

var _nodename2 = _interopRequireDefault(_nodename);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseNameFromNode = exports.parseNameFromNode = function parseNameFromNode(node) {
  if (node.name && node.name.text) {
    return node.name.text;
  } else if (node.type && node.type.typeName) {
    return node.type.typeName.text;
  } else if (node.moduleSpecifier) {
    return node.moduleSpecifier.text;
  } else if (node.expression) {
    return _printers2.default.node.printType(stripDetailsFromTree(node.expression));
  } else if (node.declarationList) {
    var declarations = node.declarationList.declarations.map(stripDetailsFromTree).map(_printers2.default.node.printType).join(" ");

    return declarations;
  }

  console.log("INVALID NAME");
  return "INVALID NAME REF";
};

// Traverse a node and strip information we dont care about
// This is mostly to make debugging a bit less verbose
var stripDetailsFromTree = exports.stripDetailsFromTree = function stripDetailsFromTree(root) {
  var clone = _lodash2.default.omit(root, ["pos", "end", "parent", "flags"]);

  for (var key in clone) {
    var val = clone[key];

    if (clone.hasOwnProperty(key) && (typeof val === "undefined" ? "undefined" : _typeof(val)) === "object") {
      if (_lodash2.default.isArray(val)) {
        clone[key] = val.map(function (item) {
          return stripDetailsFromTree(item);
        });
      } else {
        clone[key] = stripDetailsFromTree(val);
      }
    }
  }

  // Use actual names instead of node type IDs
  clone.kind = (0, _nodename2.default)(clone);

  return clone;
};

var collectNode = function collectNode(node, context, factory) {
  switch (node.kind) {
    case _typescript2.default.SyntaxKind.ModuleDeclaration:
      if (node.flags === 4098 || node.flags === 16 /* TODO: Replace with namespace flag enum */
      ) {
          var namespace = factory.createNamespaceNode(node.name.text);

          context.addChild("namespace" + node.name.text, namespace);

          _namespaceManager2.default.setContext(node.name.text);

          traverseNode(node.body, namespace, factory);
          break;
        } else {
        var module = factory.createModuleNode(node.name.text);

        context.addChild(node.name.text, module);

        traverseNode(node.body, module, factory);
        break;
      }

    case _typescript2.default.SyntaxKind.FunctionDeclaration:
      context.addChild(parseNameFromNode(node), factory.createPropertyNode(node, parseNameFromNode(node)));
      break;

    case _typescript2.default.SyntaxKind.InterfaceDeclaration:
      context.addChild(parseNameFromNode(node), factory.createPropertyNode(node, parseNameFromNode(node)));
      break;

    case _typescript2.default.SyntaxKind.TypeAliasDeclaration:
      context.addChild(parseNameFromNode(node), factory.createPropertyNode(node, parseNameFromNode(node)));
      break;

    case _typescript2.default.SyntaxKind.ClassDeclaration:
      context.addChild(parseNameFromNode(node), factory.createPropertyNode(node));
      break;

    case _typescript2.default.SyntaxKind.VariableStatement:
      context.addChild(parseNameFromNode(node), factory.createVariableNode(node));
      break;

    case _typescript2.default.SyntaxKind.ExportAssignment:
      context.addChild(parseNameFromNode(node), factory.createExportNode(node));
      break;

    case _typescript2.default.SyntaxKind.ImportDeclaration:
      context.addChild(parseNameFromNode(node), factory.createImportNode(node));
      break;

    case _typescript2.default.SyntaxKind.ImportEqualsDeclaration:
      break;
    case _typescript2.default.SyntaxKind.EnumDeclaration:
      // not implemented
      break;

    default:
      console.log("Missing node parse", _typescript2.default.SyntaxKind[node.kind]);
  }
};

// Walk the AST and extract all the definitions we care about
var traverseNode = function traverseNode(node, context, factory) {
  if (!node.statements) {
    collectNode(node, context, factory);
  } else {
    node.statements.forEach(function (n) {
      return collectNode(n, context, factory);
    });
  }
};

function recursiveWalkTree(ast) {
  var factory = _factory2.default.create();

  var root = factory.createModuleNode("root");

  traverseNode(ast, root, factory);

  return root;
}

function getMembersFromNode(node) {
  if (node.members) {
    return node.members;
  }

  console.log("NO MEMBERS_", node);
}