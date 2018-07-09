"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

var _namespaceManager = require("../namespaceManager");

var _namespaceManager2 = _interopRequireDefault(_namespaceManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Namespace = function (_Node) {
  _inherits(Namespace, _Node);

  function Namespace(name) {
    _classCallCheck(this, Namespace);

    var _this = _possibleConstructorReturn(this, (Namespace.__proto__ || Object.getPrototypeOf(Namespace)).call(this, null));

    _this.print = function () {
      var functions = _this.getChildren().filter(function (child) {
        return child.raw && child.raw.kind === "FunctionDeclaration";
      });

      var children = "" + _this.getChildren().map(function (child) {
        return child.print(_this.name);
      }).join("\n\n");

      if (functions.length) {
        var nsGroup = "\n      declare var npm$namespace$" + _this.name + ": {\n        " + functions.map(function (child) {
          return child.name + ": typeof " + _this.name + "$" + child.name + ",";
        }).join("\n") + "\n      }";

        return nsGroup + children;
      }

      return children;
    };

    _this.name = name;
    _namespaceManager2.default.register(name);
    return _this;
  }

  _createClass(Namespace, [{
    key: "addChild",
    value: function addChild(name, child) {
      child.namespace = this.name;
      _namespaceManager2.default.registerProp(this.name, child.name);

      this.children[name] = child;
    }
  }]);

  return Namespace;
}(_node2.default);

exports.default = Namespace;