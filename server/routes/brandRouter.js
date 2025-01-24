const Router = require('express');
const router = new Router();
const brandController = require('../controllers/brandController')
const checkRole = require('../middleware/RoleMiddleware')

router.post('/', checkRole('ADMIN'), brandController.create);
router.get('/remove/:id', checkRole('ADMIN'), brandController.remove);
router.get('/', brandController.getAll);
router.get('/:id', checkRole('ADMIN'), brandController.getOne);

module.exports = router;