"use strict";

const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = BigInt(alphabet.length);

// Create a lookup table to fetch character index
const alphabetLookup = [...alphabet].reduce((lookup, char, index) => {
  lookup[char] = index;
  return lookup;
}, {});

function assertNonNegativeInteger(val) {
  if (typeof val !== "bigint" || val < 0) {
    throw new Error("Value passed is not a non-negative integer.");
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

exports.bigint_to_base58 = function(num) {
  let str = "";
  let modulus;

  num = BigInt(num);

  assertNonNegativeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = num / base;
  }

  return alphabet[num] + str;
};

exports.base58_to_bigint = function(str) {
  assertString(str);

  return [...str].reverse().reduce((num, character, index) => {
    assertBase58Character(character);
    return num + BigInt(alphabetLookup[character]) * base ** BigInt(index);
  }, BigInt(0));
};
