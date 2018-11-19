const alphabets = {
  flickr: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ",
  bitcoin: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",
  ripple: "rpshnaf39wBUDNEGHJKLM4PQRST7VWXYZ2bcdeCg65jkm8oFqi1tuvAxyz"
};
const base = alphabets.flickr.length;

// Create a lookup table to fetch character index
const alphabetLookups = Object.keys(alphabets).reduce((lookup, name) => {
  lookup[name] = [...alphabets[name]].reduce((memo, char, index) => {
    memo[char] = index;
    return memo;
  }, {});

  return lookup;
}, {});

function assertNonNegativeSafeInteger(val) {
  if (
    typeof val !== "number" ||
    isNaN(val) ||
    val < 0 ||
    val > Number.MAX_SAFE_INTEGER ||
    Math.floor(val) !== val
  ) {
    throw new Error("Value passed is not a non-negative safe integer.");
  }
}

function assertString(str) {
  if (typeof str !== "string") {
    throw new Error("Value passed is not a string.");
  }
}

function assertBase58Character(character, alphabet) {
  if (alphabetLookups[alphabet][character] === undefined) {
    throw new Error("Value passed is not a valid Base58 string.");
  }
}

exports.int_to_base58 = exports.encode = function(num, alphabet = "flickr") {
  let str = "";
  let modulus;

  num = Number(num);

  assertNonNegativeSafeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabets[alphabet][modulus] + str;
    num = Math.floor(num / base);
  }

  return alphabets[alphabet][num] + str;
};

exports.base58_to_int = exports.decode = function(str, alphabet = "flickr") {
  assertString(str);

  return [...str].reverse().reduce((num, character, index) => {
    assertBase58Character(character, alphabet);
    return num + alphabetLookups[alphabet][character] * Math.pow(base, index);
  }, 0);
};
