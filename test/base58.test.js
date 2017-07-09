var assert = require('assert');
var examples = require('./examples');
var base58 = require('..');

function exampleRunner(callback) {
  Object.keys(examples).forEach(function (str) {
    callback(str, examples[str]);
  });
}

describe('Base58', function () {
  before(function () {
    var valid = true;
    var count = 0;

    exampleRunner(function (str, num) {
      count++;
      if (typeof str !== 'string') {
        valid = false;
      }
      if (typeof num !== 'number') {
        valid = false;
      }
    });

    assert.strictEqual(count > 0, true, 'Expected there to be examples');
    assert.strictEqual(valid, true, 'Expected the examples to be valid');
  });

  describe('.encode', function () {
    it('encodes number to Base58 string', function () {
      exampleRunner(function (str, num) {
        assert.strictEqual(base58.encode(num), str);
      });
    });

    describe('when passed a string only containing numbers', function () {
      it('encodes string after first converting it to an integer', function () {
        exampleRunner(function (str, num) {
          assert.strictEqual(base58.encode(num.toString()), str);
        });
      });
    });

    describe('when passed a non number', function () {
      it('throws an error', function () {
        assert.throws(function () {
          base58.encode('hi');
        }, function (err) {
          return err.message === 'Value passed is not a non-negative safe integer.';
        });
      });
    });

    describe('when passed a float', function () {
      it('throws an error', function () {
        assert.throws(function () {
          base58.encode(3.14);
        }, function (err) {
          return err.message === 'Value passed is not a non-negative safe integer.';
        });
      });
    });

    describe('when passed a negative number', function () {
      it('throws an error', function () {
        assert.throws(function () {
          base58.encode(-300);
        }, function (err) {
          return err.message === 'Value passed is not a non-negative safe integer.';
        });
      });
    });

    describe('when passed a non-safe integer', function () {
      it('throws an error', function () {
        assert.throws(function () {
          base58.encode(1E100);
        }, function (err) {
          return err.message === 'Value passed is not a non-negative safe integer.';
        });
      });
    });
  });

  describe('.decode', function () {
    it('decodes base58 string to number', function () {
      exampleRunner(function (str, num) {
        assert.strictEqual(base58.decode(str), num);
      });
    });

    describe('when passed a non string', function () {
      it('throws an error', function () {
        assert.throws(function () {
          base58.decode(123);
        }, function (err) {
          return err.message === 'Value passed is not a string.';
        });
      });
    });

    describe('when passed a non base58 string', function () {
      it('throws an error', function () {
        assert.throws(function () {
          base58.decode('>_<');
        }, function (err) {
          return err.message === 'Value passed is not a valid Base58 string.';
        });
      });
    });
  });
});
