const express = require('express');
const router = express.Router();
const multer = require('multer');
const productController = require('../controllers/product-controller');
const { validateToken } = require('../middleware/auth');

// Multer storage and upload options
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        cb(null, fileName + '-' + Date.now());
    }
});

const uploadOptions = multer({ storage: storage });

// Routes for product management
router.post('/', validateToken, uploadOptions.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', validateToken, productController.updateProduct);
router.delete('/:id', validateToken, productController.deleteProduct);

module.exports = router;
