const express = require('express');
const router = express.Router();
const productRetailers = require('../controllers//productRetailers');


router.post('/create', productRetailers.createProductRetailers);
router.patch('/:id', productRetailers.updateProductRetailers);
router.delete('/:id', productRetailers.deleteProductRetailers);


module.exports = router;
