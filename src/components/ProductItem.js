import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const ProductItem = ({ product, onAddToCartClicked }) => {
  const style = {
    backgroundImage: `url(images/products/img${product.id}.jpg)`
  }

  return (
    <div className='product-item'>
      <div className="productImage" style={ style }></div>
      <Product
        title={product.title}
        price={product.price}
        inventory={product.inventory}
        cart={false}
        className='product-item' />
      <button
        onClick={onAddToCartClicked}
        disabled={product.inventory > 0 ? '' : 'disabled'}>
        {product.inventory > 0 ? 'Add to cart' : 'Sold Out'}
      </button>
    </div>
  )
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    inventory: PropTypes.number.isRequired
  }).isRequired,
  onAddToCartClicked: PropTypes.func.isRequired
}

export default ProductItem
