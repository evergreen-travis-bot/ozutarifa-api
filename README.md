# ozutarifa-api

![Last version](https://img.shields.io/github/tag/Kikobeats/ozutarifa-api.svg?style=flat-square)
[![Build Status](http://img.shields.io/travis/Kikobeats/ozutarifa-api/master.svg?style=flat-square)](https://travis-ci.org/Kikobeats/ozutarifa-api)
[![Coverage Status](https://img.shields.io/coveralls/Kikobeats/ozutarifa-api.svg?style=flat-square)](https://coveralls.io/github/Kikobeats/ozutarifa-api)
[![Dependency status](http://img.shields.io/david/Kikobeats/ozutarifa-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/ozutarifa-api)
[![Dev Dependencies Status](http://img.shields.io/david/dev/Kikobeats/ozutarifa-api.svg?style=flat-square)](https://david-dm.org/Kikobeats/ozutarifa-api#info=devDependencies)
[![NPM Status](http://img.shields.io/npm/dm/ozutarifa-api.svg?style=flat-square)](https://www.npmjs.org/package/ozutarifa-api)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg?style=flat-square)](https://paypal.me/Kikobeats)

> Programatic API access for ozu-tarifa.com

## Install

```bash
$ npm install ozutarifa-api --save
```

## Usage

```js
const ozutarifa = require('ozutarifa-api')

const stream = ozutarifa({
  key: process.env.API_KEY, // API Key credentials
  pages: 3, // Numbers or request per each method call
  itemsPerPage: 20 // Number of items per page [default=200]
})
```

## License

MIT © [Kiko Beats](http://kikobeats.com)
