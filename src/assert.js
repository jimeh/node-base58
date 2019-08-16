"use strict";

const alphabet = require("./alphabet");

exports.nonNegativeSafeInteger = function(val, msg) {
  if (
    typeof val !== "number" ||
    isNaN(val) ||
    val < 0 ||
    val > Number.MAX_SAFE_INTEGER ||
    Math.floor(val) !== val
  ) {
    msg = msg || "Value passed is not a non-negative safe integer.";
    throw new Error(msg);
  }
};

exports.nonNegativeInteger = function(val) {
  if (typeof val !== "bigint" || val < 0) {
    throw new Error("Value passed is not a non-negative integer.");
  }
};

exports.string = function(str) {
  if (typeof str !== "string") {
    throw new Error("Value passed is not a string.");
  }
};

exports.base58Character = function(character) {
  if (alphabet.lookup[character] === undefined) {
    throw new Error("Value passed is not a valid Base58 string.");
  }
};
