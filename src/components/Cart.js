import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { removeFromCart } from '../actions'
import { getTotal, getCartProducts, getCartVisibility } from '../reducers'
import CartItem from '../components/CartItem'

const TAX_RATE = .08

const Cart = ({ products, total, cartVisible, removeFromCart, onCheckoutClicked, onCloseCartClicked }) => {
  const hasProducts = products.length > 0
  let vizSuffix = 'open';
  const taxes = Math.round((total * TAX_RATE)*100)/100
  const grandTotal = (total*1) + taxes
  const hideAdditional = hasProducts ? '' : 'hidden'

  if (cartVisible) {
    document.body.classList.add('cart-open')
  } else {
    document.body.classList.remove('cart-open')
    vizSuffix = 'closed'
  }

  const nodes = hasProducts ? (
    products.map(product =>
        <CartItem
          key={product.id}
          product={product}
          onRemoveFromCartClicked = {() => removeFromCart(product.id)}
        />
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
          <div className='product-list'>
          {nodes}
          </div>
          <hr className={hideAdditional} />
          <div className={'total-item '+hideAdditional}>
            <span className='label'>Subtotal:</span>
            <span className='value'>{Number(total).toFixed(2)}</span>
          </div>
          <div className={'total-item '+hideAdditional}>
            <span className='label'>Taxes:</span>
            <span className='value'>{Number(taxes).toFixed(2)}</span>
          </div>
          <hr className={hideAdditional} />
          <div className={'total-item '+hideAdditional}>
            <span className='label'>Total:</span>
            <span className='value'>{Number(grandTotal).toFixed(2)}</span>
          </div>
        </div>
        <button 
          className={'checkout '+hideAdditional}
          onClick={onCheckoutClicked}
          disabled={hasProducts ? '' : 'disabled'}>
          Checkout
        </button>
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
