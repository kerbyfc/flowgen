"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require("./node");

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A way to represent multiple nodes with the same name
 * in the same scope.
 *
 * TypeScript supports declaring the same function/type/interface multple times,
 * which flow does not. This is a representation of that data.
 */
var UnionNode = function () {
  function UnionNode(nodes) {
    _classCallCheck(this, UnionNode);

    this._nodes = [];

    this.add(nodes);
  }

  _createClass(UnionNode, [{
    key: "add",
    value: function add(nodes) {
      var _this = this;

      if (nodes instanceof Array) {
        nodes.forEach(function (node) {
          _this._nodes.push(node);
        });
      } else {
        this._nodes.push(nodes);
      }
    }
  }, {
    key: "get",
    value: function get() {
      return this._nodes;
    }
  }]);

  return UnionNode;
}();

exports.default = UnionNode;