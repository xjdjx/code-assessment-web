import React from 'react'
import PropTypes from 'prop-types'
import Product from './Product'

const CartItem = ({ product, onRemoveFromCartClicked }) => {
  const style = {
    backgroundImage: `url(images/products/img${product.id}.jpg)`
  }

  return (
    <div className='cart-item'>
      <div className="productImage" style={ style }></div>
      <Product
        title={product.title}
        price={product.price}
        inventory={product.quantity}
        key={product.id} />
      <button onClick={onRemoveFromCartClicked}>
        Remove
      </button>
    </div>
  )
}

CartItem.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  }).isRequired,
  onRemoveFromCartClicked: PropTypes.func.isRequired
}

export default CartItem
