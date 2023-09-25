const router = require('express').Router()
const upload = require('../../src/multer')
const controllers = require('../../controllers/admin')

router.get('/', controllers.language.list.get)

router.get('/create', controllers.language.create.get)

router.post('/create', upload.single("image"), controllers.language.create.post)

router.get('/:id', controllers.language.edit.get)

router.post('/:id', upload.single("image"), controllers.language.edit.post)

router.post('/delete/:id', controllers.language.delete.post)

module.exports = router