const Product = require("../models/Product");

// CREATE Product
async function createProduct(req, res) {
  const { title, size, color, category, description, weatherRecommendation, available, uploader, image } = req.body;

  try {
    const product = new Product({ title, size, color, category, description, weatherRecommendation, available, uploader, image });
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ message: error.message });
  }
}

// GET ALL Product
async function getAllProducts(req, res) {
  try {
    const products = await Product.find().populate('uploader', 'name email');
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Unable to fetch products" });
  }
}

// GET PRODUCT By Id 
async function getProductById(req, res) {
  try {
    const product = await Product.findById(req.params.id).populate('uploader', 'name email');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(400).json({ message: "Invalid product ID" });
  }
}


// UPDATE Product
async function updateProduct(req, res) {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(400).json({ message: error.message });
  }
}

// DELETE Product
async function deleteProduct(req, res) {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) return res.status(404).json({ message: "Product not found" });
    res.status(200).send("Product deleted successfully");
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Unable to delete product" });
  }
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
