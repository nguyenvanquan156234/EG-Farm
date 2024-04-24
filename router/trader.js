const express = require('express');
const router = express.Router();
const traderController = require('../controllers/traderController');


router.post('/create', traderController.createTrader);
router.patch('/:id', traderController.updateTrader);
router.delete('/:id', traderController.deleteTrader);


module.exports = router;
