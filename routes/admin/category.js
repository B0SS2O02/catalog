const router = require('express').Router()
const upload = require('../../src/multer')
const controllers = require('../../controllers/admin')

router.get('/', controllers.category.list.get)

router.get('/create', controllers.category.create.get)

router.post('/create', upload.single("image"), controllers.category.create.post)

router.get('/:id', controllers.category.edit.get)

router.post('/:id', upload.single("image"), controllers.category.edit.post)

router.post('/delete/:id', controllers.category.delete.post)

module.exports = router