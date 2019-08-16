"use strict";

const alphabet = require("./alphabet");
const assert = require("./assert");

const base = alphabet.length;
const isBigIntSupported = typeof BigInt === "function";

exports.int_to_base58 = exports.encode = function(num) {
  let str = "";
  let modulus;

  if (isBigIntSupported && typeof num === "bigint") {
    return require("./bigint").bigint_to_base58(num);
  }

  num = Number(num);

  assert.nonNegativeSafeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = Math.floor(num / base);
  }

  return alphabet[num] + str;
};

exports.base58_to_int = exports.decode = function(str, useBigInt) {
  assert.string(str);

  useBigInt = useBigInt && isBigIntSupported;

  if (useBigInt) {
    return require("./bigint").base58_to_bigint(str);
  }

  return [...str].reverse().reduce((num, character, index) => {
    assert.base58Character(character);
    const result = num + alphabet.lookup[character] * Math.pow(base, index);
    assert.nonNegativeSafeInteger(
      result,
      "Value passed exceeds MAX_SAFE_INTEGER limit."
    );
    return result;
  }, 0);
};
