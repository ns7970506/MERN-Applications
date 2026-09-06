const express = require('express')
const {protect} = require('../middleware/authMiddleware')
const {admin} = require('../middleware/adminMiddleware')
const {getProducts,getProductById,createProduct,updateProduct,deleteProduct} = require('../controller/productController')

const router = express.Router()


// router.get('/register',registerUser)
// router.post('/register',registerUser)
// all product
router.route('/').get(getProducts).post(protect,admin,createProduct)
// single product
router.route('/:id').get(getProductById).put(protect,admin,updateProduct).delete(protect,admin,deleteProduct)




module.exports = router;