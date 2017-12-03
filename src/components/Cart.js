import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeFromCart } from '../actions'
import { getTotal, getCartProducts } from '../reducers'
import CartItem from '../components/CartItem'

const Cart  = ({ products, total, removeFromCart, onCheckoutClicked }) => {
  const hasProducts = products.length > 0
  const nodes = hasProducts ? (
    products.map(product =>
        <CartItem
          key={product.id}
          product={product}
          onRemoveFromCartClicked = {() => removeFromCart(product.id)}
        />
    )
  ) : (
    <em>Please add some products to cart.</em>
  )

  return (
    <div>
      <h3>Your Cart</h3>
      <div>{nodes}</div>
      <p>Total: &#36;{total}</p>
      <button onClick={onCheckoutClicked}
        disabled={hasProducts ? '' : 'disabled'}>
        Checkout
      </button>
    </div>
  )
}

Cart.propTypes = {
  products: PropTypes.array,
  total: PropTypes.string,
  onCheckoutClicked: PropTypes.func
}

const mapStateToProps = (state) => ({
  products: getCartProducts(state),
  total: getTotal(state)
})

export default connect(
  mapStateToProps,
  { removeFromCart }
)(Cart)
