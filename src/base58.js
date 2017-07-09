var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
var base = alphabet.length;

// Create a lookup table to fetch character index
var alphabetLookup = alphabet.split('').reduce(function (lookup, char, index) {
  lookup[char] = index;
  return lookup;
}, {});

function assertNonNegativeSafeInteger(val) {
  if (typeof val !== 'number' || isNaN(val) || val < 0 || val > Number.MAX_SAFE_INTEGER || Math.floor(val) !== val) {
    throw new Error('Value passed is not a non-negative safe integer.');
  }
}

function assertString(str) {
  if (typeof str !== 'string') {
    throw new Error('Value passed is not a string.');
  }
}

function assertBase58Character(character) {
  if (alphabetLookup[character] === undefined) {
    throw new Error('Value passed is not a valid Base58 string.');
  }
}

exports.encode = function (num) {
  var str = '';
  var modulus;

  num = Number(num);

  assertNonNegativeSafeInteger(num);

  while (num >= base) {
    modulus = num % base;
    str = alphabet[modulus] + str;
    num = Math.floor(num / base);
  }

  return alphabet[num] + str;
};

exports.decode = function (str) {
  assertString(str);

  return str.split('').reverse().reduce(function (num, character, index) {
    assertBase58Character(character);
    return num + alphabetLookup[character] * Math.pow(base, index);
  }, 0);
};
