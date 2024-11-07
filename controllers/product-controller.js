const { v4: uuidv4 } = require('uuid'); // Import UUID
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const mongoose = require('mongoose');

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
    const { category, name, description, richDescription, brand, price, countInStock, rating, numReviews, isFeatured } = req.body;
    const categoryData = await Category.findById(category);
    
    if (!categoryData) {
        return res.status(400).send('Invalid Category');
    }

    const file = req.file;
    if (!file) {
        return res.status(400).send('No image in the request');
    }

    const fileName = file.filename;
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    const product = new Product({
        name,
        description,
        richDescription,
        image: `${basePath}${fileName}`,
        brand,
        price,
        category,
        countInStock,
        rating,
        numReviews,
        isFeatured
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
    let filter = {};
    if (req.query.categories) {
        filter = { category: req.query.categories.split(',') };
    }

    const productList = await Product.find(filter).populate('category');
    if (!productList) {
        return res.status(500).json({ success: false });
    }
    res.send(productList);
}

// Get a single product by ID
async function getProductById(req, res) {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        return res.status(500).json({ success: false });
    }
    res.send(product);
}

// Update product details
async function updateProduct(req, res) {
    const { category, name, description, richDescription, brand, price, countInStock, rating, numReviews, isFeatured, image } = req.body;
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id');
    }

    const categoryData = await Category.findById(category);
    if (!categoryData) {
        return res.status(400).send('Invalid Category');
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            description,
            richDescription,
            image, 
            brand,
            price,
            category,
            countInStock,
            rating,
            numReviews,
            isFeatured
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
