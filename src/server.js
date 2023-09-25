const express = require('express')
require('./handlebars')
const app = express();
const admin = require('../routes/admin')
const sequelize = require('../models').sequelize
app.set('view engine', 'hbs')

app.use('/public', express.static('public'))

app.use('/admin', admin)

app.use('/api', (req, res) => {
    res.send('api')
})
sequelize.authenticate()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server started on : http://localhost:${process.env.PORT}`)
        })
    })
    .catch(err => {
        console.error('Unable to connect to the database',err);
    })

