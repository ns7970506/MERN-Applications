const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const {admin} = require('../middleware/adminMiddleware')
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controller/productController')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' }) // Specify the destination folder for uploaded files

const router = express.Router()


// router.get('/register',registerUser)
// router.post('/register',registerUser)
// all product
router.route('/').get(getProducts).post(protect,admin,upload.single('image'),createProduct)
// single product
router.route('/:id').get(getProductById).put(protect,admin,upload.single('image'),updateProduct).delete(protect,admin,deleteProduct)




module.exports = router;