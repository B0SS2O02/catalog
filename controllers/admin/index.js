
const fs = require('fs')
const path = require('path')
let routes = {}

fs.readdirSync(__dirname, (err) => {
    console.error(err)
}).forEach(file => {
    if (file != 'index.js') {
        routes[file.split('.')[0]] = require(__dirname + '/' + file)
    }
})
module.exports = routes