import React, { useEffect, useState } from 'react'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Header = ({ cartItems }) => {
	const [cartCount, setCartCount] = useState(0)
	// Обновляем количество товаров в корзине, когда изменяется состояние корзины
	useEffect(() => {
		setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0))
	}, [cartItems])
	return (
		<header>
			<div className='headerLeft'>
				<Link to='/'>
					<img src='images/logo.svg' width='35px' alt='logo' />
					<h3>Test Shop</h3>
				</Link>
			</div>
			<div className='headerRight'>
				<Link to='/cart'>
					<div className='cart'>
						<AiOutlineShoppingCart />
						<span className='cartCount'>{cartCount}</span>
					</div>
				</Link>
			</div>
		</header>
	)
}

export default Header
