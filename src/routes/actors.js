const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController')

// ---- Detail of an actor/tress --- //
router.get('/detail/:id', actorsController.detail);

module.exports = router;
