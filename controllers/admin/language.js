const utils = require('../../src/util')
const models = require('../../models')
const fs = require('fs')
module.exports = { create: {}, list: {}, edit: {}, delete: {} }

module.exports.create.get = (req, res) => {
    res.render("index", {
        type: 'form',
        form: {
            attributes: {
                method: 'Post',
                enctype: "multipart/form-data"
            },
            elements: [{
                title: 'Title',
                type: 'input',
                attributes: {
                    class: 'light',
                    required: '',
                    name: 'title',
                }
            }, {
                title: 'Image',
                type: 'image',
                attributes: {
                    class: 'light',
                    required: '',
                    name: 'image',
                }
            }
            ]
        }
    })
}

module.exports.create.post = async (req, res) => {
    try {
        await models.language.create({
            title: req.body.title,
            image: '/public/images/' + req.file.filename
        })
    } catch (error) {

        fs.unlink('/public/images/' + req.file.filename)
    }
    res.redirect(utils.rout_back(req.originalUrl))
}

module.exports.list.get = async (req, res) => {
    let data = await models.language.findAll({
        attributes: ['id', 'title', 'image']
    })
    data = utils.toJSON(data)
    console.log(data)
    res.render('index', {
        type: 'list',
        list: {
            options:
            {
                edit: '/admin/language',
                create: '/admin/language/create',
                delete: '/admin/language/delete'
            }
            ,
            header: [
                { name: 'id', title: 'ID', type: "id" },
                { name: 'title', title: 'Langauge name', type: 'title' },
                { name: 'image', title: 'Langauge image', type: 'image' }
            ],
            content: data
        }
    })
}

module.exports.edit.get = async (req, res) => {
    let data = await models.language.findOne({
        attributes: ['id', "title", 'image'],
        where: {
            id: req.params.id
        }
    })
    data = utils.toJSON(data)
    res.render("index", {
        type: 'form',
        form: {
            attributes: {
                method: 'Post',
                enctype: "multipart/form-data"
            },
            elements: [{
                title: 'Title',
                type: 'input',
                attributes: {
                    class: 'light',
                    name: 'title',
                    value: data.title
                }
            }, {
                title: 'Image',
                type: 'image',
                attributes: {
                    class: 'light',
                    name: 'image',
                    src: data.image
                }
            }
            ]
        }
    })
}

module.exports.edit.post = async (req, res) => {
    let data = await models.language.findOne({
        where: {
            id: req.params.id
        }
    })
    let update_data = {}
    if (!!req.file) {
        update_data['image'] = '/public/images/' + req.file.filename
        fs.unlink(data.image.slice(1),(err)=>{
            console.log(err)
        })
    }
    if (!!req.body.title) {
        update_data['title'] = req.body.title
    }
    // console.log(update_data)
    await models.language.update(
        update_data,
        {
            where: {
                id: req.params.id
            }
        }
    )
    res.redirect(utils.rout_back(req.originalUrl))
}

module.exports.delete.post = async (req, res) => {
    const data = await models.language.findOne({
        where: {
            id: req.params.id
        }
    })
    await models.language.destroy({
        where: {
            id: req.params.id
        }
    })
    fs.unlink(data.image.slice(1),(err)=>{
        console.log(err)
    })
    res.redirect(utils.rout_back(req.originalUrl, 2))
}