const product = require('../model/Product')
const cloudinary = require('../config/cloudinary')

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
        const product = await product.findById(req.params.id)
        if (product){
            res.json(product)
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
           const result = await cloudinary.uploader.upload(req.file.path) 
           imageUrl = result.secure_url
        }

        const product = new product({
            name,
            description,
            price,
            category,
            stock,
            imageUrl
        });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct)
     }
        catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
}