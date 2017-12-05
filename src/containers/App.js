import React from 'react'
import ProductsContainer from './ProductsContainer'
import CartContainer from './CartContainer'
import CartStatus from '../components/CartStatus'

const App = ({openCart}) => (
	<div>
		<div className='header'>
			<h2>Acme Store</h2>
			<CartStatus />
		</div>
		<hr/>
		<ProductsContainer />	
		<CartContainer />
	</div>
)

export default App
