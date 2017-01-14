'use strict'

var parsePrice = require('parse-price')

const transform = {
  // because first char is a symbol
  price: (item) => Math.trunc(parsePrice(item.price)),
  year: (item) => item.year ? Number(item.year) : null
}

function normalize (item) {
  Object.keys(transform).forEach(function (key) {
    const fn = transform[key]
    item[key] = fn(item)
  })

  return item
}

module.exports = normalize
