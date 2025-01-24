const Router = require('express');
const router = new Router();
const favoritesController = require('../controllers/favoritesController')
const checkRole = require('../middleware/RoleMiddleware')

router.get('/add/:id', checkRole('ADMIN'), favoritesController.add);
router.get('/remove/:id', checkRole('ADMIN'), favoritesController.remove);
router.get('/', checkRole('ADMIN'), favoritesController.getAll);

module.exports = router;