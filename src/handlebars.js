const hbs = require('hbs')
const Handlebars = require('handlebars')
const Navbar = require('../views/navbar.json')
const fs = require('fs')
let default_image = '/public/images/default.svg'

hbs.registerHelper('navbar', () => {
    let navbar = ''
    for (const key in Navbar) {
        if (Object.hasOwnProperty.call(Navbar, key)) {
            const element = Navbar[key];
            navbar += `<a class="navbar-link" href="${element.link}">${element.title}</a>`
        }
    }
    return new Handlebars.SafeString(navbar);
})


hbs.registerHelper('link', (text, url) => {
    return new Handlebars.SafeString("<a href='" + url + "'>" + text + "</a>");
})

hbs.registerHelper('form', (form) => {
    let text = '<form class="form"'
    for (const key in form.attributes) {
        if (Object.hasOwnProperty.call(form.attributes, key)) {
            const attribute = form.attributes[key];
            text += ` ${key}="${attribute}"`
        }
    }
    text += '>'
    form.elements.forEach((element, index) => {
        if (element.type == 'input') {
            text += `<div class="form-element"><label class="form-label">${element.title}</label>`
            text += '<input class="form-input"'
            for (const key in element.attributes) {
                if (Object.hasOwnProperty.call(element.attributes, key)) {
                    const attribute = element.attributes[key];
                    text += ` ${key}="${attribute}"`
                }
            }
            text += '/>'
            text += '</div>'
        } else if (element.type == 'id') {
            text += `<div class="form-element"><label class="form-label">${element.title}</label>`
            text += '<input class="form-input" hidden'
            for (const key in element.attributes) {
                if (Object.hasOwnProperty.call(element.attributes, key)) {
                    const attribute = element.attributes[key];
                    text += ` ${key}="${attribute}"`
                }
            }
            text += '/>'
            text += `<div class="form-input">${element.attributes.value}</div>`
            text += '</div>'
        } else if (element.type == 'file') {
            text += `<div class="form-element"><label class="form-label">${element.title}</label>`
            text += `<img class="form-image" onclick="image_click(event)" id="image-${index}" src="${default_image}">`
            text += `<input hidden type="file" id="file-${index}"`
            for (const key in element.attributes) {
                if (Object.hasOwnProperty.call(element.attributes, key)) {
                    const attribute = element.attributes[key];
                    text += ` ${key}="${attribute}"`
                }
            }
            text += '/>'
            text += '</div>'
        } else if (element.type == 'image') {
            text += `<div class="form-element"><label class="form-label">${element.title}</label>`
            text += `<img class="form-image" onclick="image_click(event)" id="image-${index}" `
            if (!!element.attributes.src) {
                text += `src="${element.attributes.src}">`
            } else {
                text += `src="${default_image}">`
            }

            text += `<input hidden type="file" id="file-${index}" onchange="image_choose(event)"`
            for (const key in element.attributes) {
                if (Object.hasOwnProperty.call(element.attributes, key)) {
                    const attribute = element.attributes[key];
                    text += ` ${key}="${attribute}"`
                }
            }
            text += '/>'
            text += '</div>'
        } else if (element.type == 'textarea') {
            text += `<div class="form-element"><label class="form-label">${element.title}</label>`
            text += '<textarea class="form-textarea"'
            for (const key in element.attributes) {
                if (Object.hasOwnProperty.call(element.attributes, key)) {
                    const attribute = element.attributes[key];
                    text += ` ${key}="${attribute}"`
                }
            }
            text += '></textarea>'
            text += '</div>'
        } else if (element.type == 'select') {
            text += `<div class="form-element"><label class="form-label">${element.title}</label>`
            text += '<select class="form-select"'
            for (const key in element.attributes) {
                if (Object.hasOwnProperty.call(element.attributes, key)) {
                    const attribute = element.attributes[key];
                    text += ` ${key}="${attribute}"`
                }
            }
            text += '>'
            element.options.forEach(option => {
                text += `<option `
                for (const key in option.attributes) {
                    if (Object.hasOwnProperty.call(option.attributes, key)) {
                        const element = option.attributes[key];
                        text += ` ${key}="${element}"`
                    }
                }
                text += `>${option.title}</option>`
            });
            text += '</select>'
            text += '</div>'
        }
    });
    text += '<button class="form-send">Send</button>'
    return new Handlebars.SafeString(text)
})

hbs.registerHelper('eq', (v1, v2) => {
    if (v1 == v2) {
        return true
    } else {
        return false
    }
})

hbs.registerHelper('list', (list) => {
    // console.log(list)
    text = ''
    if (!!list.options.create) {
        text += `<a class="Link Create" href="${list.options.create}"> Create </a>`
    }
    text += '<div class="table">'
    text += '<div class="table-header"><div class="table-header-row">'
    list.header.forEach(element => {
        text += `<div class="table-header-cell">${element.title}</div>`
    });
    if (!!list.options.edit || !!list.options.delete) {
        text += `<div class="table-header-cell">Options</div>`
    }
    text += '</div></div>'

    text += '<div class="table-body">'
    list.content.forEach((element, eIndex) => {
        text += `<div class="table-row">`
        list.header.forEach((head, hIndex) => {
            if (head.type == 'image') {
                text += `<div class="table-cell"><img class="table-image" onclick="image_zoom('image-${eIndex}-${hIndex}')" id="image-${eIndex}-${hIndex}" src="${element[head.name]}" /></div>`
            } else {
                // console.log('hbs',element,head.name)
                text += `<div class="table-cell">${element[head.name]}</div>`
            }
        });
        if (!!list.options.edit || !!list.options.delete) {
            text += `<div class="table-cell table-option-cell">`
            if (!!list.options.edit) {
                text += `<a class="Link Edit" href="${list.options.edit}/${element.id}"> Edit </a>`
            }
            if (!!list.options.delete) {
                text += `<form method="POST" onsubmit="delete_alert(event)" action="${list.options.delete}/${element.id}"><button class="Link Edit"> Delete</button> </form>`
            }
            text += '</div>'
        }

        text += `</div>`
    });
    text += '</div>'
    text += '</div>'
    return new Handlebars.SafeString(text)
})


hbs.registerPartials('views/components')