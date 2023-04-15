import React from 'react'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const Header = () => {
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
						<span className='cartCount'>0</span>
					</div>
				</Link>
			</div>
		</header>
	)
}

export default Header
