const { v4: uuidv4 } = require('uuid');
const { Product } = require('../models/product');
const mongoose = require('mongoose');

// Create a new product
async function createProduct(req, res) {
    const { title, size, condition, available, uploader } = req.body;

    // Parsing `weatherRecommendation` jika ada
    let weatherRecommendation = null;
    try {
        if (req.body.weatherRecommendation) {
            weatherRecommendation = JSON.parse(req.body.weatherRecommendation);
        }
    } catch (error) {
        return res.status(400).send('Invalid JSON format for weatherRecommendation');
    }

    // Validasi keberadaan file
    const file = req.file;
    if (!file) {
        return res.status(400).send('No image in the request');
    }

    // Membuat URL gambar
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
        console.error("Error creating product:", error);
        res.status(500).send('The product cannot be created');
    }
}

// Get all products
async function getAllProducts(req, res) {
    try {
        const productList = await Product.find();
        if (!productList) {
            return res.status(500).json({ success: false });
        }
        res.send(productList);
    } catch (error) {
        res.status(500).send('Error retrieving products');
    }
}

// Get a single product by ID
async function getProductById(req, res) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.send(product);
    } catch (error) {
        res.status(500).send('Error retrieving product');
    }
}

// Update product details
async function updateProduct(req, res) {
    const { title, size, condition, available, uploader } = req.body;

    // Parsing `weatherRecommendation` jika ada
    let weatherRecommendation = null;
    try {
        if (req.body.weatherRecommendation) {
            weatherRecommendation = JSON.parse(req.body.weatherRecommendation);
        }
    } catch (error) {
        return res.status(400).send('Invalid JSON format for weatherRecommendation');
    }

    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }

    const file = req.file;
    let imagePath;

    if (file) {
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
        imagePath = `${basePath}${fileName}`;
    }

    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                title,
                size,
                condition,
                weatherRecommendation,
                available,
                uploader,
                image: imagePath ? imagePath : undefined
            },
            { new: true }
        );

        if (!product) {
            return res.status(404).send('The product cannot be updated!');
        }
        res.send(product);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send('The product cannot be updated');
    }
}

// Delete product by ID
async function deleteProduct(req, res) {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);
        if (product) {
            return res.status(200).json({ success: true, message: 'The product is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Product not found!' });
        }
    } catch (error) {
        res.status(500).send('Error deleting product');
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
