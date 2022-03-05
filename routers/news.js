const express = require('express')
const router = express.Router();
const {newsController} = require("../controller")
const { authorize } = require('../middleware/authAuthor')


router.get('/', newsController.showNews)
router.get('/category', newsController.showCategories)
router.post('/', newsController.createNews)
router.put('/:id', authorize, newsController.updateNews)
router.delete('/:id', authorize, newsController.destroyNews)
router.get('/:id', newsController.findNews)


module.exports = router