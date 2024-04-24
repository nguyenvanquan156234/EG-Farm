const express = require('express');
const router = express.Router();
const retailersController = require('../controllers/retailersController');

router.post('/create', retailersController.createRetailer);
router.patch('/:id', retailersController.updateRetailer);
router.delete('/id', retailersController.deleteRetailer);


module.exports = router;
