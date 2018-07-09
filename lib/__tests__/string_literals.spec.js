"use strict";

var _compiler = require("../cli/compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _beautifier = require("../cli/beautifier");

var _beautifier2 = _interopRequireDefault(_beautifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("should handle string literals in function argument \"overloading\"", function () {
  var ts = "\n  interface MyObj {\n      on(event: 'error', cb: (err: Error) => void): this;\n      on(event: 'close', cb: (code: number, message: string) => void): this;\n      on(event: 'message', cb: (data: any, flags: { binary: boolean }) => void): this;\n      on(event: 'ping', cb: (data: any, flags: { binary: boolean }) => void): this;\n      on(event: 'pong', cb: (data: any, flags: { binary: boolean }) => void): this;\n      on(event: 'open', cb: () => void): this;\n      on(event: string, listener: (...args: any[]) => void): this;\n  }\n";

  var result = _compiler2.default.compileDefinitionString(ts);

  expect((0, _beautifier2.default)(result)).toMatchSnapshot();
});