const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images')    // Папка, в которую будут сохраняться загруженные файлы
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + '-' + file.originalname)    // Имя файла будет оставаться неизменным
    }
});
module.exports = upload = multer({ storage: storage });