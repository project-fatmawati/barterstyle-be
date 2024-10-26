const Product = require('../models/Product');

// CREATE Product
exports.createProduct = async (req, res) => {
    try {
        const {
            title,
            category,
            size,
            condition,
            weatherRecommendation,
            uploader
        } = req.body;

        // Membuat instance produk baru dengan data yang diberikan
        const newProduct = new Product({
            title,
            category,
            size,
            condition,
            weatherRecommendation, // Termasuk weatherRecommendation dari request body
            uploader               // Mengaitkan produk dengan pengguna pengunggah
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error });
    }
};

// READ All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('uploader', 'username email'); // Mengambil detail uploader jika diperlukan
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error });
    }
};

// READ Single Product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('uploader', 'username email');
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error });
    }
};

// UPDATE Product
exports.updateProduct = async (req, res) => {
    try {
        const {
            title,
            category,
            size,
            condition,
            weatherRecommendation,
            available
        } = req.body;

        // Update produk berdasarkan ID yang diberikan
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { title, category, size, condition, weatherRecommendation, available },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error });
    }
};

// DELETE Product
exports.deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};

// CHECKOUT Product
exports.checkoutProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        
        // Periksa apakah produk masih tersedia
        if (!product.available) {
            return res.status(400).json({ message: 'Product is already checked out' });
        }

        // Tandai produk sebagai tidak tersedia
        product.available = false;
        await product.save();

        res.status(200).json({ message: 'Product checked out successfully', data: product });
    } catch (error) {
        res.status(500).json({ message: 'Error checking out product', error });
    }
};
