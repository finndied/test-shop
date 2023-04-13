import React from 'react'

import {AiOutlineShoppingCart} from 'react-icons/ai'

const Header = () => {
	return (
		<header>
			<div className='headerLeft'>
				<img src='images/logo.svg' width='35px' alt='logo' />
				<h3>Test Shop</h3>
			</div>
			<div className='headerRight'>
            <div className='cart'>
            <AiOutlineShoppingCart/>
            <span class='cartCount'>0</span>
            </div>
         </div>
		</header>
	)
}

export default Header
