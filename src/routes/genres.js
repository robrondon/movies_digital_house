const express = require('express');
const router = express.Router();
const genresController = require('../controllers/genresController');

// ---- Detail of a genre --- //
router.get('/detail/:id', genresController.detail);

module.exports = router;