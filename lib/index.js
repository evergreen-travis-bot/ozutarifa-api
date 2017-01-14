'use strict'

const createStream = require('./req-stream')

function createClient (opts) {
  const client = createStream(opts)

  client.particular = {
    boards: client.bind(client, {path: 'segunda-mano/tablas-windsurf'}),
    sails: client.bind(client, {namespace: 'segunda-mano/velas-windsurf'})
  }

  client.store = {
    boards: client.bind(client, {path: 'windsurf/tablas'}),
    sails: client.bind(client, {path: 'windsurf/velas'}),
    booms: client.bind(client, {path: 'windsurf/botavaras'}),
    masts: client.bind(client, {path: 'windsurf/mastiles'}),
    fins: client.bind(client, {path: 'windsurf/accesorios/aletas'})
  }

  client.outlet = {
    boards: client.bind(client, {path: 'outlet/windsurf-es-2', featureHash: '8-153'}),
    sails: client.bind(client, {path: 'outlet/windsurf-es-2', featureHash: '8-42'})
  }

  return client
}

module.exports = createClient
