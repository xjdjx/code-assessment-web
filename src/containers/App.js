import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'

const App = () => (
	<div>
		<div className="header">
			<h2>Acme Store</h2>
			<p>Cart</p>
		</div>
		<hr/>
		<ProductsContainer />	
		<CartContainer />
	</div>
)

export default App
