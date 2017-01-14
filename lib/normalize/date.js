'use strict'

// yes, I'm extracting the date from the image url
function normalizeDate (item) {
  const {createdAt, image} = item

  const str = image
    .replace('http://ozu-tarifa.com/wp-content/uploads/', '')
    .split('/')

  const year = str[0]
  const month = str[1]
  const day = createdAt.split('/')[0]

  return new Date(`${month} ${day}, ${year}`).getTime()
}

module.exports = normalizeDate
