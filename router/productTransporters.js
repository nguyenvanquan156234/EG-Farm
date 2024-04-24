const express = require('express');
const router = express.Router();
const productTransporterController = require('../controllers/productTransporterController');


router.post('/create', productTransporterController.createProduct);
router.patch('/:id', productTransporterController.updateProduct);
router.delete('/:id', productTransporterController.deleteProduct);


module.exports = router;
