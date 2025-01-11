const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController')
const checkRole = require('../middleware/RoleMiddleware')

// router.post('/', checkRole('ADMIN'), productController.create);
router.post('/', productController.create);
router.get('/remove/:id', productController.remove);
router.get('/', productController.getAll);
router.get('/:id', productController.getOne);

module.exports = router;