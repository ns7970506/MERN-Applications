const User = require('../model/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/Sendmail')


const generateToken = (id) =>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
}


// register user

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        // todo hash the password before saving to database
        // todo implementing jwt token for authentication
        // todo add error handling for validation and other edge cases
        // todo otp sending and verification for email and phone number
        // todo welcome mail after successful registration
        const user = await User.create({name,email,password:hashedPassword});
       if (user){
        const otp = Math.floor(100000 + Math.random()*900000).toString()
        const message = `
        Welcome to ShopKaro,${name}! Thank you for registering with us .
        Your otp for ShopKaro registration is : ${otp}`

        await sendEmail(email, 'Welcome to ShopKaro - Your Otp for registration',message)


        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).json({message:'Invalid user data'})
    }
    }
    catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
};

// login user
   const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if (user && (await bcrypt.compare(password,user.password))){
            res.json({
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
                token:generateToken(user._id)

            })
        }
        else{
            res.status(401).json({message:'Invalid email or password'}) 
        }
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
}

const getUsers = async (req,res)=>{
   try {
    const users = await User.find();
    res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:'Internal server error'})
    }
}  

module.exports = {registerUser,loginUser,getUsers}