import React from 'react'
import { connect } from 'react-redux'
import { getCartProducts } from '../reducers'
import { openCart } from '../actions'

const CartStatus = ({products, openCart}) => {
	const plural = products.length > 1 ? 's' : ''
	const message = products.length > 0 ? `You have ${products.length} item${plural} in your cart` : 'Your cart is empty'

	return (
		<div className='cartStatus' onClick={openCart}>
			<img src="images/cart_sm.svg" alt="cart" width="17" height="14" />
			<p>{message}</p>
		</div>
	)
}	

const mapStateToProps = (state) => ({
  products: getCartProducts(state)
})

export default connect(
  mapStateToProps, {openCart}
)(CartStatus)