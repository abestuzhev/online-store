const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController')
const checkRole = require('../middleware/RoleMiddleware')

router.post('/', checkRole('ADMIN'), typeController.create);
router.get('/', checkRole('ADMIN'), typeController.getAll);
router.get('/remove/:id', checkRole('ADMIN'), typeController.remove);
router.get('/:id', checkRole('ADMIN'), typeController.getOne);

module.exports = router;