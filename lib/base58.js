(function() {
  var Base58;

  Base58 = (function() {

    function Base58() {
      this.alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
      this.base = this.alphabet.length;
    }

    Base58.prototype.encode = function(num) {
      var mod, str;
      if (typeof num !== 'number') {
        throw new Error('Value passed is not a number.');
      }
      str = '';
      while (num >= this.base) {
        mod = num % this.base;
        str = this.alphabet[mod] + str;
        num = (num - mod) / this.base;
      }
      return this.alphabet[num] + str;
    };

    Base58.prototype.decode = function(str) {
      var char, char_index, index, num, _len, _ref;
      num = 0;
      _ref = str.split(/(?:)/).reverse();
      for (index = 0, _len = _ref.length; index < _len; index++) {
        char = _ref[index];
        if ((char_index = this.alphabet.indexOf(char)) === -1) {
          throw new Error('Value passed not a valid Base58 string.');
        }
        num += char_index * Math.pow(this.base, index);
      }
      return num;
    };

    return Base58;

  })();

  module.exports = new Base58();

}).call(this);
