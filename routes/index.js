const router = require('express').Router()
const TestRoute = require('./testRoute')
const UserController = require('../controllers/userController')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use('/test', TestRoute)

module.exports = router