const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController')

/* GET home page. */
router.get('/', actorsController.all);
router.get('/detail/:id', actorsController.detail);
router.get('/recommended', actorsController.recommended);
router.post('/search', actorsController.search);


module.exports = router;
