const assert = require("assert");
const examples = require("./examples");
const base58 = require("..");

function exampleRunner(alphabet, callback) {
  Object.keys(alphabet).forEach(function(str) {
    callback(str, alphabet[str]);
  });
}

describe("Base58", function() {
  before(function() {
    var valid = true;
    var count = 0;

    for (var alphabetName in examples.alphabets) {
      exampleRunner(examples.alphabets[alphabetName], function(str, num) {
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
    }
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
    for (var alphabetName in examples.alphabets) {
      describe("when using " + alphabetName + " alphabet", function() {
        it("encodes number to Base58 string", function() {
          exampleRunner(examples.alphabets[alphabetName], function(str, num) {
            let result = base58.int_to_base58(num, alphabetName);

            assert.strictEqual(result, str);
          });
        });

        describe("when passed a string only containing numbers", function() {
          it("encodes string after first converting it to an integer", function() {
            exampleRunner(examples.alphabets[alphabetName], function(str, num) {
              let result = base58.int_to_base58(num.toString(), alphabetName);

              assert.strictEqual(result, str);
            });
          });
        });
      });
    }

    describe("when alphabet is not specified", function() {
      it("encodes number to Base58 string with flickr alphabet", function() {
        exampleRunner(examples.alphabets.flickr, function(str, num) {
          let result = base58.int_to_base58(num);

          assert.strictEqual(result, str);
        });
      });

      describe("when passed a string only containing numbers", function() {
        it(
          "encodes string with flickr alphabet " +
            "after first converting it to an integer",
          function() {
            exampleRunner(examples.alphabets.flickr, function(str, num) {
              let result = base58.int_to_base58(num.toString());

              assert.strictEqual(result, str);
            });
          }
        );
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
    for (var alphabetName in examples.alphabets) {
      describe("when using " + alphabetName + " alphabet", function() {
        it("decodes base58 string to number", function() {
          exampleRunner(examples.alphabets[alphabetName], function(str, num) {
            let result = base58.base58_to_int(str, alphabetName);

            assert.strictEqual(result, num);
          });
        });

        describe("when passed a non string", function() {
          it("throws an error", function() {
            assert.throws(
              function() {
                base58.base58_to_int(123, alphabetName);
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
                base58.base58_to_int(">_<", alphabetName);
              },
              function(err) {
                return (
                  err.message === "Value passed is not a valid Base58 string."
                );
              }
            );
          });
        });
      });
    }

    describe("when alphabet is not specified", function() {
      it("decodes base58 string to number with flickr alphabet", function() {
        exampleRunner(examples.alphabets.flickr, function(str, num) {
          let result = base58.base58_to_int(str);

          assert.strictEqual(result, num);
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
              return (
                err.message === "Value passed is not a valid Base58 string."
              );
            }
          );
        });
      });
    });
  });
});
