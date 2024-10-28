const express = require('express');
const router = express.Router();
const productController = require('../controllers/product-controller');

router.post('/', productController.createProduct);
router.post('/checkout/:id', productController.checkoutProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);


module.exports = router;