'use strict'

var condenseWhitespace = require('condense-whitespace')
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

  const {year} = item

  if (year) {
    const yearTwoDigits = year.toString().slice(-2)
    const regexYear = new RegExp(`${year}|${yearTwoDigits}|-`, 'g')
    const newTitle = item.title.replace(regexYear, '')
    item.title = condenseWhitespace(newTitle)
  }

  return item
}

module.exports = normalize
