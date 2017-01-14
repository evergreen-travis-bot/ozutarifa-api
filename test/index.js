/* global it */

'use strict'

const should = require('should')
const createClient = require('..')
const env = process.env.NODE_ENV || 'development'
const log = env === 'development' ? console.log : function () {}

it('works fine', function (done) {
  const ozutarifa = createClient({
    key: process.env.API_KEY,
    pages: 2,
    itemsPerPage: 20
  })

  const stream = ozutarifa.particular.boards()

  let count = 0

  stream.on('data', function (data) {
    data.should.be.an.Object()
    ;[
      ['title', String],
      ['price', Number],
      ['link', String],
      ['image', String]
    ].forEach(function (pair) {
      const prop = pair[0]
      const type = pair[1]
      data.should.have.property(prop)
      data[prop].should.be.a[type.name]()
    })

    if (data.year) data.year.should.be.a.Number()

    const {title, price, link} = data
    log(`${++count}: ${title} €${price} ${link}`)
  })

  stream.on('end', function () {
    count.should.be.equal(20)
    done()
  })

  stream.on('error', done)
})
