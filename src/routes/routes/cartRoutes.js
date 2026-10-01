const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.post('/adicionar', cartController.adicionarItem);

module.exports = router;
