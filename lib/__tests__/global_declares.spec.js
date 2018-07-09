"use strict";

var _compiler = require("../cli/compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _beautifier = require("../cli/beautifier");

var _beautifier2 = _interopRequireDefault(_beautifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("should handle declared interfaces", function () {
  var ts = "\ndeclare interface ICustomMessage {\n  method(test: string): void;\n  otherMethod(literal: \"A\"|\"B\"): void;\n}\n";
  expect((0, _beautifier2.default)(_compiler2.default.compileDefinitionString(ts))).toMatchSnapshot();
});