const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');
const { validateToken } = require('../middleware/auth');

// Routes untuk manajemen product
router.post('/', validateToken, productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validateToken, productController.updateProduct);
router.delete('/:id', validateToken, productController.deleteProduct);

module.exports = router;
