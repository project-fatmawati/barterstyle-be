const Product = require('../models/Product');

// Fungsi untuk membuat produk baru
async function createProduct(req, res) {
    const { title, size, color, category, condition, available, uploader, image } = req.body;

    // Parsing `weatherRecommendation` jika ada
    let weatherRecommendation = null;
    try {
        if (req.body.weatherRecommendation) {
            weatherRecommendation = JSON.parse(req.body.weatherRecommendation);
        }
    } catch (error) {
        return res.status(400).send('Invalid JSON format for weatherRecommendation');
    }

    // Validasi URL gambar
    if (!image) {
        return res.status(400).send('Image URL is required');
    }

    const product = new Product({
        title,
        size,
        color,
        category,
        condition,
        weatherRecommendation,
        available,
        uploader,
        image,
    });

    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).send('The product cannot be created');
    }
}

// Fungsi untuk mendapatkan semua produk
async function getAllProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send('Unable to fetch products');
    }
}

// Fungsi untuk mendapatkan produk berdasarkan ID
async function getProductById(req, res) {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).send('Unable to fetch product');
    }
}

// Fungsi untuk memperbarui produk berdasarkan ID
async function updateProduct(req, res) {
    const { id } = req.params;
    const { title, size, color, category, condition, available, image } = req.body;

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, size, color, category, condition, available, image },
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).send('Unable to update product');
    }
}

// Fungsi untuk menghapus produk berdasarkan ID
async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).send('Product not found');
        }
        res.status(200).send('Product deleted successfully');
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).send('Unable to delete product');
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById, 
    updateProduct,
    deleteProduct
};
