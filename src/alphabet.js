"use strict";

const alphabet = [
  ..."123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
];

// Create a lookup table to fetch character index
alphabet.lookup = alphabet.reduce((lookup, char, index) => {
  lookup[char] = index;
  return lookup;
}, {});

module.exports = alphabet;
