const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
const base = alphabet.length;

// Create a lookup table to fetch character index
const alphabetLookup = [...alphabet].reduce((lookup, char, index) => {
  lookup[char] = index;
  return lookup;
}, {});

const isSafeNonNegativeInt = thing => thing >= 0 && Number.isSafeInteger(thing);
const isString = thing => typeof thing === "string";
const isBase58Char = char => char in alphabetLookup;

const assertType = (checkFn, message) => value => {
  if (!checkFn(value)) {
    throw new TypeError(message);
  }
};

const assertNonNegativeSafeInteger = assertType(
  isSafeNonNegativeInt,
  "Value passed is not a non-negative safe integer."
);

const assertString = assertType(
  isString,
  "Value passed is not a string."
);

const assertBase58Character = assertType(
  isBase58Char,
  "Value passed is not a valid Base58 string."
);

exports.int_to_base58 = exports.encode = function(num) {
  let str = "";
  let modulus;

  num = Number(num);

  assertNonNegativeSafeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = Math.floor(num / base);
  }

  return alphabet[num] + str;
};

exports.base58_to_int = exports.decode = function(str) {
  assertString(str);

  return [...str].reverse().reduce((num, character, index) => {
    assertBase58Character(character);
    return num + alphabetLookup[character] * Math.pow(base, index);
  }, 0);
};
