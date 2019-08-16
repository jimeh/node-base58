"use strict";

const alphabet = require("./alphabet");
const assert = require("./assert");

const base = BigInt(alphabet.length);

exports.bigint_to_base58 = function(num) {
  let str = "";
  let modulus;

  num = BigInt(num);

  assert.nonNegativeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = num / base;
  }

  return alphabet[num] + str;
};

exports.base58_to_bigint = function(str) {
  assert.string(str);

  return [...str].reverse().reduce((num, character, index) => {
    assert.base58Character(character);
    return num + BigInt(alphabet.lookup[character]) * base ** BigInt(index);
  }, BigInt(0));
};
