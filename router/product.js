const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
 // Import the Multer configuration
const iaAuth = require('../helpers/isAuth.js');

router.post('/create',iaAuth.upload, productController.createNewProduct); // Use the upload middleware for single file upload
router.patch('/:id',iaAuth.upload, productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
module.exports = router;
