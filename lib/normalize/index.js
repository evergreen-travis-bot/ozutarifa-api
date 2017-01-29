'use strict'

const condenseWhitespace = require('condense-whitespace')
const parsePrice = require('parse-price')

const exists = (value) => value != null

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
  },
  title: (item) => {
    const {title, year, price} = item
    let newTitle = title

    if (exists(year)) {
      newTitle = `${title} ${year}`
      // ensure we clean other years from the title
      const yearTwoDigits = year.toString().slice(-2)
      const regexYear = new RegExp(`${year}|${yearTwoDigits}|-`, 'g')
      newTitle = newTitle.replace(regexYear, '')
    }

    if (exists(price)) newTitle = `${title} €${price}`

    return condenseWhitespace(newTitle)
  }
}

function normalize (item) {
  Object.keys(transform).forEach(function (key) {
    const fn = transform[key]
    item[key] = fn(item)
  })

  return item
}

module.exports = normalize
