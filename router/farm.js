const express = require('express');
const router = express.Router();
const farmController = require('../controllers/farmController.js')


router.post('/create', farmController.createFarm);
router.patch('/:id', farmController.updateFarm);
router.delete('/:id', farmController.deleteFarm);

module.exports = router;