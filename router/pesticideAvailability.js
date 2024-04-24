const express = require('express');
const router = express.Router();
const pesticideAvailabilityController = require('../controllers/pesticideAvailabilityController');


router.post('/create', pesticideAvailabilityController.createPesticideAvailability);
router.patch('/:id', pesticideAvailabilityController.updatePesticideAvailability);
router.delete('/:id', pesticideAvailabilityController.deletePesticideAvailability);


module.exports = router;
