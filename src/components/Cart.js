import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeFromCart } from '../actions'
import { getTotal, getCartProducts, getCartVisibility } from '../reducers'
import CartItem from '../components/CartItem'

const Cart = ({ products, total, cartVisible, removeFromCart, onCheckoutClicked, onCloseCartClicked }) => {
  const hasProducts = products.length > 0
  const vizSuffix = cartVisible ? 'open' : 'closed'
  const nodes = hasProducts ? (
    products.map(product =>
        <div>
        <CartItem
          key={product.id}
          product={product}
          onRemoveFromCartClicked = {() => removeFromCart(product.id)}
        />
        <p>Total: {total}</p>
        <button onClick={onCheckoutClicked}
          disabled={hasProducts ? '' : 'disabled'}>
          Checkout
        </button>
        </div>
    )
  ) : (
    <div className="no-items">
      <div><img src="images/cart.svg" alt="cart" width="100" height="100" /></div>
      <em>Please add some products to your cart.</em>
    </div>
  )

  return (
    <div className={'cart cart-'+vizSuffix}>
      <div className="modal">
        <div className="modal-content">
          <h3>Your Cart</h3>
          <hr />
          {nodes}
        </div>
        <div className="close" onClick={onCloseCartClicked}>
          <img src="images/close.svg" alt="close" width="30" height="30" />
        </div>
      </div>
      <div className="overlay"></div>
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
  total: getTotal(state),
  cartVisible: getCartVisibility(state)
})

export default connect(
  mapStateToProps,
  { removeFromCart }
)(Cart)
