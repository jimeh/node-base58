# node-base58 [![Build Status](https://secure.travis-ci.org/jimeh/node-base58.png)](http://travis-ci.org/jimeh/node-base58)

A Base58 encoding and decoding library for [Node.js].

[node.js]: http://nodejs.org/

## What?

Base58 allows you to represent a numeric value with fewer characters, useful
for short URLs among other things. Flickr is one the biggest sites that makes
use of it for short photo URLs.

For example `6857269519` becomes `brXijP` when Base58 encoded, and hence the
Flickr short URL is: `http://flic.kr/p/brXijP`

## Installation

    npm install base58

## Usage

```javascript
var Base58 = require('base58');
Base58.encode(6857269519); // 'brXijP'
Base58.decode('brXijP');   // 6857269519
```

## Credit

This package is more or less a port of the [Base58][gem] Ruby Gem by the same
name.

[gem]: https://github.com/dougal/base58

## License

Released under the MIT license. Copyright (c) 2012 Jim Myhrberg.
