"use strict";

var _compiler = require("../cli/compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _beautifier = require("../cli/beautifier");

var _beautifier2 = _interopRequireDefault(_beautifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("should handle union strings", function () {
  var ts = "\n  interface MyObj {\n    state?: \"APPROVED\" | \"REQUEST_CHANGES\" | \"COMMENT\" | \"PENDING\"\n  }\n";

  var result = _compiler2.default.compileDefinitionString(ts);

  expect((0, _beautifier2.default)(result)).toMatchSnapshot();
});