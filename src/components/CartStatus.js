import React from 'react'
import { connect } from 'react-redux'
import { getCartProducts } from '../reducers'
import { openCart } from '../actions'

const CartStatus = ({products, openCart}) => {
	let product_count = 0
	products.forEach ((product) => {
		product_count += product.quantity
	});

	const plural = product_count > 1 ? 's' : ''
	const message = product_count > 0 ? `You have ${product_count} item${plural} in your cart` : 'Your cart is empty'

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