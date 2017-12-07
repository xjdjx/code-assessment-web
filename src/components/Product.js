import React from 'react'
import PropTypes from 'prop-types'

const Product = ({ price, inventory, title, cart }) => (
  <div>
    <p className='title'>{title}</p>
    <p className='price'>&#36;{price}</p>
    <p className='inventory'>{inventory ? ` ${inventory} REMAINING` : null}</p>
  </div>
)

Product.propTypes = {
  price: PropTypes.number,
  inventory: PropTypes.number,
  title: PropTypes.string,
  cart: PropTypes.bool
}

export default Product
