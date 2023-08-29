const hbs = require('hbs')
const Handlebars=require('handlebars')
hbs.registerHelper('link', (text, url) => {
    return new Handlebars.SafeString("<a href='" + url + "'>" + text + "</a>");
})
hbs.registerPartials('views/components')