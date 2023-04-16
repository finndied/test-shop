import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './components/Cart/Cart'
import Header from './components/Header'
import ProductList from './components/ProductList/ProductList'
import { useState } from 'react'

function App() {
	const [cartItems, setCartItems] = useState([])
	const handleAddToCart = product => {
		setCartItems(prevItems => {
			// Проверяем, есть ли товар уже в корзине
			const existingItem = prevItems.find(item => item.id === product.id)
			if (existingItem) {
				// Если товар уже есть в корзине, не добавляем его повторно
				return prevItems
			} else {
				// Если товара еще нет в корзине, добавляем его с количеством 1
				return [...prevItems, { ...product, quantity: 1 }]
			}
		})
	}
  // Удаление товара из корзины
  const handleDelete = index => {
		const newCartItems = [...cartItems]
		newCartItems.splice(index, 1)
		setCartItems(newCartItems)
		}
  // Очищение корзины после заказа  
    const handleClearCart = () => {
      setCartItems([])
    }
	return (
		<Router>
			<div className='App'>
				<Header cartItems={cartItems} />
				<Routes>
					<Route
						path='/'
						element={
							<ProductList
								cartItems={cartItems}
								handleAddToCart={handleAddToCart}
							/>
						}
					/>
					<Route path='/cart' element={<Cart cartItems={cartItems} handleDelete={handleDelete} handleClearCart={handleClearCart}/>} />
				</Routes>
			</div>
		</Router>
	)
}

export default App
