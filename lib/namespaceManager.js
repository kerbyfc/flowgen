"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var namespaceProps = {};
var namespaces = [];

var context = "";

exports.default = {
  register: function register(name) {
    return namespaces.push(name);
  },
  registerProp: function registerProp(namespace, name) {
    return namespaceProps[name] = namespace;
  },
  nsExists: function nsExists(name) {
    return namespaces.includes(name);
  },
  nsPropExists: function nsPropExists(name) {
    return Object.keys(namespaceProps).includes(name);
  },
  getNSForProp: function getNSForProp(name) {
    return namespaceProps[name];
  },
  setContext: function setContext(namespace) {
    return context = namespace;
  },

  reset: function reset() {
    namespaceProps = {};
    namespaces = [];
  }
};