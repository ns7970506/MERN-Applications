import React from 'react'
import {Link} from 'react-router-dom'
import '../style/productCard.css'

const ProductCard = ({product}) => {
  return (
    <div className='product-card'>
        <img src={product.imageUrl} alt={product.name} className='product-image' />
        <div className='product-info'>
            <h3 className='product-name'>{product.name}</h3>
            <p className='product-price'>${product.price.toFixed(2)}</p>
            <Link to={`/products/${product._id}`} className='view-details-button'>view Details</Link>
        </div>
    </div>
  )
}

export default ProductCard