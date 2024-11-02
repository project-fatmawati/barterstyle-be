const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/product-controller');
const upload = multer({ storage: multer.memoryStorage() });


router.post('/', upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
