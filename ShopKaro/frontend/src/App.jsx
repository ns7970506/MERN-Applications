import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import About from './pages/About'
import ReturnPolicy from './pages/ReturnPolicy'
import Disclaimer from './pages/Disclaimer'
import Register from './pages/Register'
import Login from './pages/Login'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetail from './pages/ProductDetail'
import OrderSuccess from './pages/OrderSuccess'
import Profile from './pages/Profile'
import AddProduct from './admin/AddProduct'
import AdminDashboard from './admin/AdminDashboard'
import AdminOrders from './admin/AdminOrders'
import AdminProducts from './admin/AdminProducts'
import AdminUsers from './admin/AdminUsers'
import EditProduct from './admin/EditProducts'
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom'
const App = () => {
  return (
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About/>}></Route>
            <Route path='/return' element={<ReturnPolicy/>}></Route>
            <Route path='/checkout' element={<Checkout/>}></Route>
            <Route path='/disclaimer' element={<Disclaimer/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/shop' element={<Shop/>}></Route>
             <Route path='/register' element={<Register/>}></Route>
             <Route path='/products/:id' element={<ProductDetail/>}></Route>
             <Route path='/cart' element={<Cart/>}></Route>
             <Route path='/ordersuccess' element={<OrderSuccess/>}></Route>
             <Route path='/profile' element={<Profile/>}></Route>
              <Route path='/admin/add-product' element={<AddProduct/>}></Route>
              <Route path='/admin' element={<AdminDashboard/>}></Route>
              <Route path='/admin/orders' element={<AdminOrders/>}></Route>
              <Route path='/admin/products' element={<AdminProducts/>}></Route>
              <Route path='/admin' element={<AdminDashboard/>}></Route>
              <Route path='/admin/users' element={<AdminUsers/>}></Route>
              <Route path='/admin/edit-product/:id' element={<EditProduct/>}></Route>
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App
