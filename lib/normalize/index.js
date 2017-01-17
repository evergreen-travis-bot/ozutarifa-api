'use strict'

var parsePrice = require('parse-price')

const transform = {
  // because first char is a symbol
  price: (item) => {
    const {price} = item
    return Math.trunc(parsePrice(price))
  },
  // the year is extracted from a generic text field
  year: (item) => {
    const {year} = item
    if (!year) return
    const ensureYear = year.split(',')[0]
    const ensureNumber = Number(ensureYear)
    if (Number.isNaN(ensureNumber)) return null
    return ensureNumber
  }
}

function normalize (item) {
  Object.keys(transform).forEach(function (key) {
    const fn = transform[key]
    item[key] = fn(item)
  })

  if (item.year) {
    const stringYear = `${item.year} `
    item.title = item.title.replace(stringYear, '')
  }

  return item
}

module.exports = normalize
