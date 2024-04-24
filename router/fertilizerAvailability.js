const express = require('express');
const router = express.Router();
const fertilizerAvailabilityController = require('../controllers/fertilizerAvailabilityController');


router.post('/create', fertilizerAvailabilityController.createFertilizerAvailability);
router.patch('/:id', fertilizerAvailabilityController.updateFertilizerAvailability);
router.delete('/:id', fertilizerAvailabilityController.deleteFertilizerAvailability);


module.exports = router;
