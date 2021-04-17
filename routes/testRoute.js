const router = require('express').Router()
const TestController = require('../controllers/testController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.get('/', TestController.allTest)
router.use(authentication.user)
router.post('/', authorization.check, TestController.addTest)
router.put('/:id', authorization.check, TestController.editTest)
router.delete('/:id', authorization.check, TestController.deleteTest)

module.exports = router