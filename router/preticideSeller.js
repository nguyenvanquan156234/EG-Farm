const express = require('express');
const router = express.Router();
const pesticideSeller = require('../controllers/pesticideSeller');


router.post('/create', pesticideSeller.createPesticideSeller);
router.patch('/:id', pesticideSeller.updatePesticideSeller);
router.delete('/:id', pesticideSeller.deletePesticideSeller);


module.exports = router;
