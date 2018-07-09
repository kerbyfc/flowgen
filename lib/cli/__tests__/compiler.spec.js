"use strict";

var _compiler = require("../compiler");

var _compiler2 = _interopRequireDefault(_compiler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("should handle maybe & nullable type", function () {
  var result = _compiler2.default.compileDefinitionString("let a: string | null | undefined");

  expect(result).toMatchSnapshot();
});


it("should handle bounded polymorphism", function () {
  var ts = "\n    function fooGood<T extends { x: number }>(obj: T): T {\n      console.log(Math.abs(obj.x));\n      return obj;\n    }\n  ";

  var result = _compiler2.default.compileDefinitionString(ts);

  expect(result).toMatchSnapshot();
});