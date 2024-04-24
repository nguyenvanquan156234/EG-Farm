const express = require('express');
const router = express.Router();
const pesticideController = require('../controllers//pesticideController');


router.post('/create', pesticideController.createPesticide);
router.patch('/:id', pesticideController.updatePesticide);
router.delete('/:id', pesticideController.deletePesticide);


module.exports = router;
