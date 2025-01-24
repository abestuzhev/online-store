const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basketController')

router.get('/add/:id',  basketController.add);
router.get('/remove/:id',  basketController.remove);
router.get('/', basketController.getAll);

module.exports = router;