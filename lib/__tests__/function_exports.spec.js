"use strict";

var _compiler = require("../cli/compiler");

var _compiler2 = _interopRequireDefault(_compiler);

var _beautifier = require("../cli/beautifier");

var _beautifier2 = _interopRequireDefault(_beautifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

it("should handle exported es module functions", function () {
  var ts = "export function routerReducer(state?: RouterState, action?: Action): RouterState;\nexport function syncHistoryWithStore(history: History, store: Store<any>, options?: SyncHistoryWithStoreOptions): History & HistoryUnsubscribe;\n";
  var result = _compiler2.default.compileDefinitionString(ts);
  expect((0, _beautifier2.default)(result)).toMatchSnapshot();
});