const product = require('../model/Product')
const cloudinary = require('../config/cloudinary')
const fs = require('fs/promises')

const uploadImage = async (file) => {
    if (!file) throw new Error('Product image is required')

    try {
        const result = await cloudinary.uploader.upload(file.path, {
            resource_type: 'image'
        })
        return result.secure_url
    } finally {
        // The image is stored in Cloudinary now; do not keep local temp files.
        await fs.unlink(file.path).catch(() => {})
    }
}

const getProducts = async (req,res)=>{
    try {
        const products = await product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }

}

const getProductById = async (req,res)=>{
    try {
        const foundProduct = await product.findById(req.params.id)
        if (foundProduct){
            res.json(foundProduct)
        }
        else{
            res.status(404).json({message:'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message:'Internal server error'})

    }

}

const createProduct = async (req,res)=>{
     try {
    const {name,description,price,category,stock} = req.body;
    let imageUrl = '';
   
        if(req.file){
           imageUrl = await uploadImage(req.file)
        }

        const newproduct = new product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
    const savedProduct = await newproduct.save();
    res.status(201).json(savedProduct)
     }
        catch (error) {
            console.error('Create product failed:', error.message);
        res.status(500).json({message:'Internal server error'})
    }
}


const updateProduct = async (req,res)=>{
    try {
        const {name,description,price,category,stock} = req.body;
        const foundProduct = await product.findById(req.params.id)
        if(foundProduct){
            foundProduct.name = name || foundProduct.name
            foundProduct.description = description || foundProduct.description
            foundProduct.price = price || foundProduct.price
            foundProduct.category = category || foundProduct.category
            foundProduct.stock = stock || foundProduct.stock
            if(req.file){
             foundProduct.imageUrl = await uploadImage(req.file)
        }
        const updatedProduct = await foundProduct.save()
        res.json(updatedProduct)
    }
    else{
        res.status(404).json({message:'Product not found'})
    }
}
catch (error) { 
        res.status(500).json({message:'Internal server error'})
}
}


const deleteProduct = async (req,res)=>{
    try {
        const foundProduct = await product.findById(req.params.id)
        if( foundProduct){
            await foundProduct.deleteOne()
            res.json({message:'Product removed'})
        }
        else{
            res.status(404).json({message:'Product not found'})
        }
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
};

module.exports = {getProducts,getProductById,createProduct,updateProduct,deleteProduct}
