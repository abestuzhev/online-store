const Router = require('express');
const router = new Router();
const favoritesController = require('../controllers/favoritesController')
const checkRole = require('../middleware/RoleMiddleware')

router.get('/add/:id',  favoritesController.add);
router.get('/remove/:id',  favoritesController.remove);
router.get('/', favoritesController.getAll);

module.exports = router;