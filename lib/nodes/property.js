"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

var _printers = require("../printers");

var _printers2 = _interopRequireDefault(_printers);

var _namespaceManager = require("../namespaceManager");

var _namespaceManager2 = _interopRequireDefault(_namespaceManager);

var _parse = require("../parse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Property = function (_Node) {
  _inherits(Property, _Node);

  function Property(node) {
    _classCallCheck(this, Property);

    var _this = _possibleConstructorReturn(this, (Property.__proto__ || Object.getPrototypeOf(Property)).call(this, node));

    _this.name = (0, _parse.parseNameFromNode)(node);
    return _this;
  }

  _createClass(Property, [{
    key: "print",
    value: function print() {
      var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

      var out = "";
      var name = this.name;

      if (namespace) {
        _namespaceManager2.default.registerProp(namespace, this.name);
      }

      if (namespace) {
        name = namespace + "$" + name;
      }

      if (this.raw.jsDoc) {
        out += _printers2.default.common.comment(this.raw.jsDoc);
      }

      switch (this.raw.kind) {
        case "FunctionDeclaration":
          out += _printers2.default.functions.functionDeclaration(name, this.raw);
          break;
        case "ClassDeclaration":
          out += _printers2.default.declarations.classDeclaration(this.raw);
          break;
        case "InterfaceDeclaration":
          out += _printers2.default.declarations.interfaceDeclaration(name, this.raw);
          break;
        case "TypeAliasDeclaration":
          out += _printers2.default.declarations.typeDeclaration(name, this.raw);
          break;
      }

      return out;
    }
  }]);

  return Property;
}(_node2.default);

exports.default = Property;