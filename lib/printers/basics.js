"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var types = {
  VoidKeyword: "void",
  StringKeyword: "string",
  AnyKeyword: "any",
  NumberKeyword: "number",
  BooleanKeyword: "boolean",
  NullKeyword: "null",
  UndefinedKeyword: "void"
};

var print = exports.print = function print(kind) {
  return types[kind];
};