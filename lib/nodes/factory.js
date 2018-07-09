"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _import = require("./import");

var _import2 = _interopRequireDefault(_import);

var _export = require("./export");

var _export2 = _interopRequireDefault(_export);

var _module = require("./module");

var _module2 = _interopRequireDefault(_module);

var _variable = require("./variable");

var _variable2 = _interopRequireDefault(_variable);

var _property = require("./property");

var _property2 = _interopRequireDefault(_property);

var _namespace = require("./namespace");

var _namespace2 = _interopRequireDefault(_namespace);

var _parse = require("../parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
  function Factory() {
    _classCallCheck(this, Factory);

    this.createNamespaceNode = function (name) {
      return new _namespace2.default(name);
    };

    this.createImportNode = function (node) {
      return new _import2.default(node);
    };

    this.createExportNode = function (node) {
      return new _export2.default(node);
    };

    this.createVariableNode = function (node) {
      return new _variable2.default(node);
    };

    this._modules = {};
    this._propDeclarations = {};
  }

  // If multiple declarations are found for the same module name
  // return the memoized instance of the module instead


  _createClass(Factory, [{
    key: "createModuleNode",
    value: function createModuleNode(name) {
      if (Object.keys(this._modules).includes(name)) {
        return this._modules[name];
      }

      var module = new _module2.default(name);

      this._modules[name] = module;

      return module;
    }

    // Some definition files (like lodash) declare the same
    // interface/type/function multiple times as a way of overloading.
    // Flow does not support that, and this is where we handle that

  }, {
    key: "createPropertyNode",
    value: function createPropertyNode(node, name) {
      if (!name) {
        return new _property2.default(node);
      }

      if (Object.keys(this._propDeclarations).includes(name)) {
        this._propDeclarations[name].maybeAddMember((0, _parse.getMembersFromNode)(node));

        return this._propDeclarations[name];
      }

      var propNode = new _property2.default(node);
      this._propDeclarations[name] = propNode;
      return propNode;
    }
  }]);

  return Factory;
}();

exports.default = {
  create: function create() {
    return new Factory();
  }
};