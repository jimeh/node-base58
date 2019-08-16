"use strict";

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;

// Create a lookup table to fetch character index
const alphabetLookup = [...alphabet].reduce((lookup, char, index) => {
  lookup[char] = index;
  return lookup;
}, {});

const isBigIntSupported = typeof BigInt === "function";

function assertNonNegativeSafeInteger(val, msg) {
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
}

function assertString(str) {
  if (typeof str !== "string") {
    throw new Error("Value passed is not a string.");
  }
}

function assertBase58Character(character) {
  if (alphabetLookup[character] === undefined) {
    throw new Error("Value passed is not a valid Base58 string.");
  }
}

exports.int_to_base58 = exports.encode = function(num) {
  let str = "";
  let modulus;

  if (isBigIntSupported && typeof num === "bigint") {
    return require("./bigint").bigint_to_base58(num);
  }

  num = Number(num);

  assertNonNegativeSafeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = Math.floor(num / base);
  }

  return alphabet[num] + str;
};

exports.base58_to_int = exports.decode = function(str, useBigInt) {
  assertString(str);

  useBigInt = useBigInt && isBigIntSupported;

  if (useBigInt) {
    return require("./bigint").base58_to_bigint(str);
  }

  return [...str].reverse().reduce((num, character, index) => {
    assertBase58Character(character);
    const result = num + alphabetLookup[character] * Math.pow(base, index);
    assertNonNegativeSafeInteger(
      result,
      "Value passed exceeds MAX_SAFE_INTEGER limit."
    );
    return result;
  }, 0);
};
