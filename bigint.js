"use strict";

const base58 = require(".");

exports.int_to_base58 = exports.encode = base58.int_to_base58;

exports.base58_to_int = exports.decode = function(str) {
  return base58.base58_to_int(str, true);
};
