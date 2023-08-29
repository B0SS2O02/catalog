require('dotenv').config()
const sequelize = require('./database')
const express = require('express')
require('./handlebars_config')
const app = express();

app.set('view engine', 'hbs')

app.use('/public', express.static('public'))

app.use('/admin', (req, res) => {
    res.send('admin')
})

app.use('/api', (req, res) => {
    res.send('api')
})

app.use('/test', (req, res) => {
    const data = {
        title: 'Пример Handlebars с Express',
        message: 'Привет, мир!',
        url: '1234'
    };

    res.render('index', data);
})

app.listen(4000, () => {
    console.log('Server work on http://localhost:4000')
})
