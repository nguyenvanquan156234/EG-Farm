const express = require('express');
const router = express.Router();
const fertilizerSeller = require('../controllers/fertilizerSeller');


router.post('/create', fertilizerSeller.createFertilizerSeller);
router.patch('/:id', fertilizerSeller.updateFertilizerSeller);
router.delete('/:id', fertilizerSeller.deleteFertilizerSeller);


module.exports = router;
