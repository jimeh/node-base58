class Base58
  constructor: ->
    @alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
    @base = @alphabet.length

  encode: (num) ->
    throw new Error('Value passed is not a number.') if typeof num != 'number'
    str = ''
    while num >= @base
      mod = num % @base
      str = @alphabet[mod] + str
      num = (num - mod)/@base
    @alphabet[num] + str

  decode: (str) ->
    num = 0
    for char, index in str.split(//).reverse()
      if (char_index = @alphabet.indexOf(char)) == -1
        throw new Error('Value passed not a valid Base58 string.')
      num += char_index * Math.pow(@base, index)
    num


# Export module
module.exports = new Base58()