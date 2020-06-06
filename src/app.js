const app = require('express')()
const consign = require('consign')
const knex = require('knex')
const knexfile = require('../knexfile')

// TODO criar chaveamento dinamico
app.db = knex(knexfile.test)

consign({cwd: 'src', verbose: false})
    .include('./config/middlewares.js')
    .then('./routes')
    .then('./config/router.js')
    .into(app)

app.get('/', (req, res) => {
    res.status(200).send()
})

// app.db
//     .on('query', query => {console.info({sql: query.sql, bindings: query.bindings ? query.bindings.join(',') : ''})})
//     .on('query-response', response => {console.log(response)})
//     .on('error', error => {console.error(error)})

module.exports = app
