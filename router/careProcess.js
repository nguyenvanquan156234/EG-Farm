const express = require('express');
const router = express.Router();
const careProcessController = require('../controllers/careProcessController');


router.post('/create', careProcessController.createCareProcess);
router.patch('/:id', careProcessController.updateCareProcess);
router.delete('/:id', careProcessController.deleteCareProcess);


module.exports = router;
