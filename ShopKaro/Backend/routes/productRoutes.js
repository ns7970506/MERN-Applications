const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const {admin} = require('../middleware/adminMiddleware')
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controller/productController')
const multer = require('multer')
const path = require('path')

// Use an absolute path so uploads work no matter which directory starts Node.
const upload = multer({
    dest: path.join(__dirname, '../uploads'),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) return callback(null, true)
        callback(new Error('Only image files are allowed'))
    }
})

const router = express.Router()


// router.get('/register',registerUser)
// router.post('/register',registerUser)
// all product
router.route('/').get(getProducts).post(protect,admin,upload.single('image'),createProduct)
// single product
router.route('/:id').get(getProductById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)




module.exports = router;
