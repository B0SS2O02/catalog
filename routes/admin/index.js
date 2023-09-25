const route = require('express').Router()
const category = require('./category')
const language = require('./language')
const main=require('./admin')

route.use('/category', category)

route.use('/language', language)

route.use('/', main)

module.exports = route