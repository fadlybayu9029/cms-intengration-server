const express = require('express');
const router = express.Router();
const AuthController = require("../controller/authController")
const {newsController} = require("../controller")
const newsRouter = require('./news')
const {authenticate} = require('../middleware/authAuthor')

router.get('/', AuthController.home)
router.post('/register', AuthController.registerAdmin)
router.post('/login', AuthController.login)
router.post('/authGoogle', AuthController.authGoogle)

router.use(authenticate)
router.get('/categories', newsController.showCategories)
router.use('/news', newsRouter)

module.exports = router
