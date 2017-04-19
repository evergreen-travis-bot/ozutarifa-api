'use strict'

const should = require('should')
const createClient = require('..')
const env = process.env.NODE_ENV || 'development'
const log = env === 'development' ? console.log : function () {}

it('works fine', function (done) {
  const ozutarifa = createClient({
    key: process.env.API_KEY
  })

  const stream = ozutarifa.store.sails()

  let count = 0

  stream.on('data', function (data) {
    should(data).be.an.Object()
    ;[
      ['title', String],
      ['price', Number],
      ['link', String],
      ['image', String]
    ].forEach(function (pair) {
      const prop = pair[0]
      const type = pair[1]
      should(data).have.property(prop)
      should(data[prop]).be.a[type.name]()
    })

    if (data.year) should(data.year).be.a.Number()
    log(++count, data)
  })

  stream.on('end', function () {
    should(count > 1).be.true()
    done()
  })

  stream.on('error', done)
})
