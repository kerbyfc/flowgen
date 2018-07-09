"use strict";

var _compiler = require("../compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("handles the danger.d.ts correctly", function () {
  var dangerDTS = _fs2.default.readFileSync(__dirname + "/fixtures/danger.d.ts", "utf8");
  var result = _compiler2.default.compileDefinitionString(dangerDTS);

  expect(result).toMatchSnapshot();
});