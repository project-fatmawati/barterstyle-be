const Product = require('../models/Product');
const bucket = require('../config/firebaseConfig'); 

// CREATE Product
exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      size,
      condition,
      weatherRecommendation,
      uploader,
    } = req.body;

    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Upload file ke Firebase
    const blob = bucket.file(Date.now() + '-' + file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      res.status(500).send({ message: error.message });
    });

    blobStream.on('finish', async () => {
      // URL gambar setelah di-upload ke Firebase
      const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;

      // Membuat instance produk baru dengan data yang diberikan
      const newProduct = new Product({
        title,
        category,
        size,
        condition,
        weatherRecommendation,
        uploader,
        imageUrl,
      });

      await newProduct.save();
      res.status(201).json({ message: 'Product created successfully', data: newProduct });
    });

    blobStream.end(file.buffer);
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error });
  }
};

//  CHECKOUT Product
// exports.checkoutProduct = async (req, res) => {
//     try {
//         const product = await Product.findById(req.params.id);
        
//         if (!product) {
//             return res.status(404).json({ message: 'Product not found' });
//         }
        
//         // Periksa apakah produk masih tersedia
//         if (!product.available) {
//             return res.status(400).json({ message: 'Product is already checked out' });
//         }

//         // Tandai produk sebagai tidak tersedia
//         product.available = false;
//         await product.save();

//         res.status(200).json({ message: 'Product checked out successfully', data: product });
//     } catch (error) {
//         res.status(500).json({ message: 'Error checking out product', error });
//     }
// };
