'use strict'

const normalize = require('./normalize')
const CONST = require('./constants')
const from = require('from2').obj
const got = require('got')

const fetch = (opts) => got.get(CONST.ENDPOINT, opts)

const DEFAULT = {
  itemsPerPage: 200,
  pages: Infinity
}

function createStream (opts) {
  const {
    key: wrapAPIKey,
    itemsPerPage = DEFAULT.itemsPerPage,
    pages = DEFAULT.pages,
    featureHash
  } = opts

  const page = 1

  function reqStream (query) {
    Object.assign(query, {featureHash, itemsPerPage, wrapAPIKey, page})
    const fetchOpts = {json: true, query: query}
    const hasFetch = () => query.page - 1 < pages

    const stream = from(function (size, next) {
      if (!hasFetch()) return next(null, null)

      fetch(fetchOpts)
        .then(res => {
          const {body} = res
          if (!body.success) return next(body.messages)

          const items = body.data.items
          const lastItem = items.pop()

          items.forEach(item => this.push(normalize(item)))

          ++query.page
          next(null, normalize(lastItem))
          if (items.length < itemsPerPage) next(null, null)
        })
        .catch(next)
    })

    return stream
  }

  return reqStream
}

module.exports = createStream
