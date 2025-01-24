const Router = require('express');
const router = new Router();
const productController = require('../controllers/productController')
const checkRole = require('../middleware/RoleMiddleware')

router.post('/', checkRole('ADMIN'), productController.create);
router.get('/remove/:id', checkRole('ADMIN'), productController.remove);
router.get('/', productController.getAll);
router.get('/:id', checkRole('ADMIN'), productController.getOne);

module.exports = router;