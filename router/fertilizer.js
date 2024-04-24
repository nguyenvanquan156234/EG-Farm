const express = require('express');
const router = express.Router();
const fertilizerController = require('../controllers/fertilizerController');


router.post('/create', fertilizerController.createFertilizer);
router.patch('/:id', fertilizerController.updateFertilizer);
router.delete('/:id', fertilizerController.deleteFertilizer);


module.exports = router;
