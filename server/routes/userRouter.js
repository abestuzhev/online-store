const Router = require('express');
const router = new Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/AuthMiddleware')

router.post('/registration', authMiddleware, userController.registration);
router.post('/login', authMiddleware, userController.login);
router.get('/auth', authMiddleware, userController.auth);

module.exports = router;