const { v4: uuidv4 } = require('uuid');
const { Product } = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');

// Image file type validation map
const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('Invalid image type');

        if (isValid) {
            uploadError = null;
        }
        cb(uploadError, 'public/uploads');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
});

const uploadOptions = multer({ storage: storage });

// Create a new product
async function createProduct(req, res) {
    const { title, size, condition, weatherRecommendation, available, uploader } = req.body;

    const file = req.file;
    if (!file) {
        return res.status(400).send('No image in the request');
    }

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = new Product({
        title,
        size,
        condition,
        weatherRecommendation,
        available,
        uploader,
        image: `${basePath}${fileName}`
    });

    try {
        const newProduct = await product.save();
        res.send(newProduct);
    } catch (error) {
        res.status(500).send('The product cannot be created');
    }
}

// Get all products
async function getAllProducts(req, res) {
    const productList = await Product.find();
    if (!productList) {
        return res.status(500).json({ success: false });
    }
    res.send(productList);
}

// Get a single product by ID
async function getProductById(req, res) {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({ success: false });
    }
    res.send(product);
}

// Update product details
async function updateProduct(req, res) {
    const { title, size, condition, weatherRecommendation, available, uploader } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            title,
            size,
            condition,
            weatherRecommendation,
            available,
            uploader
        },
        { new: true }
    );

    if (!product) {
        return res.status(500).send('The product cannot be updated!');
    }
    res.send(product);
}

// Delete product by ID
async function deleteProduct(req, res) {
    const product = await Product.findByIdAndRemove(req.params.id);
    if (product) {
        return res.status(200).json({ success: true, message: 'The product is deleted!' });
    } else {
        return res.status(404).json({ success: false, message: 'Product not found!' });
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
