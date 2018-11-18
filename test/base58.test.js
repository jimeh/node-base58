const assert = require("assert");
const examples = require("./examples");
const base58 = require("..");

function exampleRunner(callback) {
  Object.keys(examples).forEach(function(str) {
    callback(str, examples[str]);
  });
}

describe("Base58", function() {
  before(function() {
    var valid = true;
    var count = 0;

    exampleRunner(function(str, num) {
      count++;
      if (typeof str !== "string") {
        valid = false;
      }
      if (typeof num !== "number") {
        valid = false;
      }
    });

    assert.strictEqual(count > 0, true, "Expected there to be examples");
    assert.strictEqual(valid, true, "Expected the examples to be valid");
  });

  describe("backwards compatibility", function() {
    it(".encode() is an alias to .int_to_base58()", function() {
      assert.strictEqual(base58.encode, base58.int_to_base58);
    });

    it(".decode() is an alias to .base58_to_int()", function() {
      assert.strictEqual(base58.decode, base58.base58_to_int);
    });
  });

  describe(".int_to_base58()", function() {
    it("encodes number to Base58 string", function() {
      exampleRunner(function(str, num) {
        assert.strictEqual(base58.int_to_base58(num), str);
      });
    });

    describe("when passed a string only containing numbers", function() {
      it("encodes string after first converting it to an integer", function() {
        exampleRunner(function(str, num) {
          assert.strictEqual(base58.int_to_base58(num.toString()), str);
        });
      });
    });

    describe("when passed a non number", function() {
      it("throws an error", function() {
        assert.throws(
          function() {
            base58.int_to_base58("hi");
          },
          function(err) {
            return (
              err.message === "Value passed is not a non-negative safe integer."
            );
          }
        );
      });
    });

    describe("when passed a float", function() {
      it("throws an error", function() {
        assert.throws(
          function() {
            base58.int_to_base58(3.14);
          },
          function(err) {
            return (
              err.message === "Value passed is not a non-negative safe integer."
            );
          }
        );
      });
    });

    describe("when passed a negative number", function() {
      it("throws an error", function() {
        assert.throws(
          function() {
            base58.int_to_base58(-300);
          },
          function(err) {
            return (
              err.message === "Value passed is not a non-negative safe integer."
            );
          }
        );
      });
    });

    describe("when passed a non-safe integer", function() {
      it("throws an error", function() {
        assert.throws(
          function() {
            base58.int_to_base58(1e100);
          },
          function(err) {
            return (
              err.message === "Value passed is not a non-negative safe integer."
            );
          }
        );
      });
    });
  });

  describe(".base58_to_int()", function() {
    it("decodes base58 string to number", function() {
      exampleRunner(function(str, num) {
        assert.strictEqual(base58.base58_to_int(str), num);
      });
    });

    describe("when passed a non string", function() {
      it("throws an error", function() {
        assert.throws(
          function() {
            base58.base58_to_int(123);
          },
          function(err) {
            return err.message === "Value passed is not a string.";
          }
        );
      });
    });

    describe("when passed a non base58 string", function() {
      it("throws an error", function() {
        assert.throws(
          function() {
            base58.base58_to_int(">_<");
          },
          function(err) {
            return err.message === "Value passed is not a valid Base58 string.";
          }
        );
      });
    });
  });
});
