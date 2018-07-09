"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _parse = require("../parse");

var _printers = require("../printers");

var _printers2 = _interopRequireDefault(_printers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Node = function () {
  function Node(node) {
    _classCallCheck(this, Node);

    this.children = {};

    if (node) {
      this.raw = (0, _parse.stripDetailsFromTree)(node);
      this.name = (0, _parse.parseNameFromNode)(node);
    }
  }

  _createClass(Node, [{
    key: "addChild",
    value: function addChild(name, node) {
      this.children[name] = node;
    }

    /**
     * Used for overloading the props of some types
     */

  }, {
    key: "maybeAddMember",
    value: function maybeAddMember(members) {
      var _this = this;

      if (!this.raw.members) {
        return;
      }

      if (Array.isArray(members)) {
        members.forEach(function (member) {
          _this.raw.members.push((0, _parse.stripDetailsFromTree)(member));
        });
      } else {
        this.raw.members.push((0, _parse.stripDetailsFromTree)(members));
      }
    }
  }, {
    key: "getChildren",
    value: function getChildren() {
      return _lodash2.default.toArray(this.children);
    }
  }, {
    key: "print",
    value: function print() {
      return _printers2.default.node.printType(this.raw);
    }
  }]);

  return Node;
}();

exports.default = Node;