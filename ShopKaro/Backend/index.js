const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const userRoutes = require('./routes/authRoutes')
const path = require('path');


dotenv.config()
connectDB();



const app = express();
app.use(cors(
    {
        origin:['http://localhost:3000', 'http://127.0.0.1:3000',process.env.FRONTEND_URL],
        credentials: true
    }
))
app.use(express.json())


 app.use('/api/auth',userRoutes)

 app.use('/api/products',require('./routes/productRoutes')) ; 
 app.use('/api/orders',require('./routes/orderRoutes'))
 app.use('/api/payment',require('./routes/paymentRoutes'))
 app.use('/api/analytics',require('./routes/analyticsRoutes'))

 // Return upload errors as JSON so the frontend can display the actual reason.
 app.use((error, req, res, next) => {
   if (error instanceof require('multer').MulterError) {
     const message = error.code === 'LIMIT_FILE_SIZE'
       ? 'Image must be 5 MB or smaller'
       : error.message;
     return res.status(400).json({ message });
   }

   if (error) return res.status(400).json({ message: error.message || 'Upload failed' });
   next();
 });

 // Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('ShopKaro API is running in Development mode...');
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})
