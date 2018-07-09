"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exportForFlowTyped;

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exportForFlowTyped(moduleName, output) {
  var folder = "../exports/" + moduleName + "_v1.x.x";
  var outputFile = folder + "/flow_v0.35.x-/" + moduleName + ".js";

  var testfilePath = folder + "/test_" + moduleName + ".js";

  if (!_fs2.default.existsSync(folder)) {
    _fs2.default.mkdirSync(folder);
    _fs2.default.existsSync(folder + "/flow_v0.35.x-") || _fs2.default.mkdirSync(folder + "/flow_v0.35.x-");
  }

  _fs2.default.writeFileSync(testfilePath, "");
  _fs2.default.writeFileSync(folder + "/flow_v0.35.x-/" + moduleName + ".js", output);

  return testfilePath;
}