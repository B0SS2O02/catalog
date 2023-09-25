const utils = require('../../src/util')
const models = require('../../models')
const fs = require('fs')
module.exports = { create: {}, list: {}, edit: {}, delete: {} }

module.exports.create.get = async (req, res) => {
    let languages = await models.language.findAll({
        attributes: ['id', "title"]
    })
    languages = utils.toJSON(languages)
    let elements = []
    for (const key in languages) {
        if (Object.hasOwnProperty.call(languages, key)) {
            const element = languages[key];
            elements.push({
                title: `Title ${element.title}`,
                type: 'input',
                attributes: {
                    class: 'light',
                    required: '',
                    name: `lang-${element.id}`,
                }
            })
        }
    }
    elements.push({
        title: 'Image',
        type: 'image',
        attributes: {
            class: 'light',
            required: '',
            name: 'image',
        }
    })
    console.log(languages)
    res.render("index", {
        type: 'form',
        form: {
            attributes: {
                method: 'Post',
                enctype: "multipart/form-data"
            },
            elements: elements
        }
    })
}

module.exports.create.post = async (req, res) => {
    console.log(req.body)
    try {
        let data = await models.category.create({
            img: '/public/images/' + req.file.filename
        })
        for (const key in req.body) {
            await models.category_lang.create({
                title: req.body[key],
                lang: parseInt(key.split('-')[1]),
                main_ID: data.id
            })
        }

    } catch (error) {
        fs.unlink('/public/images/' + req.file.filename, (err) => {
            console.log(err)
        })
    }
    res.redirect(utils.rout_back(req.originalUrl))
}

module.exports.list.get = async (req, res) => {
    let data = await models.category.findAll({
        attributes: ['id', ['img', 'image']],
        include: {
            model: models.category_lang,
            attributes: [['lang', 'id'], 'title']

        }
    })
    data = utils.toJSON(data)
    let languages = await models.language.findAll({
        attributes: ['id', "title"]
    })
    languages = utils.toJSON(languages)
    let temp = []

    data.forEach(row => {
        let r = {}
        console.log('r', row)
        for (const key in row) {
            if (Object.hasOwnProperty.call(row, key)) {
                const element = row[key];
                if (typeof (element) == 'object') {
                    for (const key2 in element) {
                        if (Object.hasOwnProperty.call(element, key2)) {
                            const cell = element[key2];
                            console.log('c', cell)
                            r[`title-${cell.id}`] = cell.title
                        }
                    }
                } else {
                    r[key] = element
                }

            }
        }
        temp.push(r)
    });

    data = temp
    let header = [{ name: 'id', title: 'ID', type: "id" }]
    for (const key in languages) {
        if (Object.hasOwnProperty.call(languages, key)) {
            const element = languages[key];
            header.push({ name: `title-${element.id}`, title: element.title, type: 'title' })
        }
    }
    header.push({ name: 'image', title: 'Category image', type: 'image' })
    console.log(data, header)
    res.render('index', {
        type: 'list',
        list: {
            options:
            {
                edit: '/admin/category',
                create: '/admin/category/create',
                delete: '/admin/category/delete'
            }
            ,
            header: header,
            content: data
        }
    })
}

module.exports.edit.get = async (req, res) => {
    let data = await models.category.findOne({
        attributes: ['id', ['img', 'image']],
        include: {
            model: models.category_lang,
            attributes: [['lang', 'id'], 'title']

        },
        where: {
            id: req.params.id
        }
    })
    data = utils.toJSON(data)
    let temp = {}
    let languages = await models.language.findAll({
        attributes: ['id', "title"]
    })
    languages = utils.toJSON(languages)
    let l = {}
    languages.forEach((language) => {
        l[language.id] = language.title
    })
    languages = l
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (typeof (element) == 'object') {
                console.log('e', element)
                for (const key2 in element) {
                    if (Object.hasOwnProperty.call(element, key2)) {
                        const cell = element[key2];
                        console.log(1, cell.id)
                        temp[`${languages[cell.id]}-${cell.id}`] = cell.title
                        delete languages[cell.id]
                    }
                }
                for (const key in languages) {
                    if (Object.hasOwnProperty.call(languages, key)) {
                        const element = languages[key];
                        temp[`${element}-${key}`] = ''
                    }
                }
            } else {
                temp[key] = element
            }

        }
    }
    data = temp
    let elements = []
    console.log('d', data)
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            const element = data[key];
            if (key == 'id') {
                elements.push({
                    title: key,
                    type: 'id',
                    attributes: {
                        class: 'light',
                        name: 'id',
                        value: data[key]
                    }
                })
            } else if (key == 'image') {
                elements.push({
                    title: key,
                    type: 'image',
                    attributes: {
                        class: 'light',
                        name: 'image',
                        src: data[key]
                    }
                })
            } else {
                elements.push({
                    title: key.split('-')[0],
                    type: 'input',
                    attributes: {
                        class: 'light',
                        name: key.split('-')[1],
                        value: data[key]
                    }
                })
            }

        }
    }
    console.log('e', elements)
    res.render("index", {
        type: 'form',
        form: {
            attributes: {
                method: 'Post',
                enctype: "multipart/form-data"
            },
            elements: elements
        }
    })
}

module.exports.edit.post = async (req, res) => {
    console.log(234, req.body)
    let update_data = {}
    if (!!req.file) {
        update_data['image'] = '/public/images/' + req.file.filename
        fs.unlink(data.image.slice(1), (err) => {
            console.log(err)
        })
        await models.category.update({
            img: update_data.image
        }, {
            where: {
                id: req.params.id
            }
        })
    }
    for (const key in req.body) {
        if (Object.hasOwnProperty.call(req.body, key)) {
            const element = req.body[key];
            const l = await models.category_lang.findOne(
                {
                    where: {
                        main_ID: req.params.id,
                        lang: key
                    }
                }
            )
            if (l) {
                await models.category_lang.update(
                    {
                        title: element
                    },
                    {
                        where: {
                            main_ID: req.params.id,
                            lang: key
                        }
                    }
                )
            } else {
                await models.category_lang.create({
                    title: element,
                    main_ID: req.params.id,
                    lang: key
                })
            }

        }
    }
    console.log(req.body)
    // res.send()
    res.redirect(utils.rout_back(req.originalUrl))
}

module.exports.delete.post = async (req, res) => {
    const data = await models.category.findOne({
        where: {
            id: req.params.id
        }
    })
    await models.category.destroy({
        where: {
            id: req.params.id
        }
    })
    if (data) {
        if (data.image) {
            fs.unlink(data.image.slice(1), (err) => {
                console.log(err)
            })
        }

    }

    res.redirect(utils.rout_back(req.originalUrl, 2))
    // res.send('1')
}