const express = require('express');
const router = express.Router();
const transporterController = require('../controllers/transporterController');


router.post('/create', transporterController.createTransporter);
router.patch('/:id', transporterController.updateTransporter);
router.delete('/:id', transporterController.deleteTransporter);


module.exports = router;
