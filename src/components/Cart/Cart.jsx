import React, { useState } from 'react'
import styles from './Cart.module.scss'
import { AiOutlineDelete } from 'react-icons/ai'
const Cart = ({ cartItems, handleDelete }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [quantities, setQuantities] = useState(cartItems.map(item => 1))

	const handleNameChange = event => {
		setName(event.target.value)
	}

	const handlePhoneChange = event => {
		setPhone(event.target.value)
	}

	// Увеличиваем количество товаров в корзине
	const handleQuantityIncrease = index => {
		const newQuantities = [...quantities]
		newQuantities[index] += 1
		setQuantities(newQuantities)
	}
	// Уменьшаем количество товаров в корзине
	const handleQuantityDecrease = index => {
		const newQuantities = [...quantities]
		if (newQuantities[index] > 1) {
			newQuantities[index] -= 1
			setQuantities(newQuantities)
		}
	}
	// Получения суммы цен за все товары в корзине
	const totalPrice = cartItems.reduce((accumulator, item, index) => {
		return accumulator + item.regular_price.value * quantities[index]
	}, 0)

	return (
		<div className={styles.cart}>
			<div className={styles.cartWrapper}>
				{cartItems.map((item, index) => (
					<div className={styles.card} key={item.id}>
						<img src={item.image} width={80} alt={item.title} />
						<div className={styles.cardItems}>
							<h3>{item.title}</h3>
							<div className={styles.price}>
								<div>{item.regular_price.value}</div>
								<div>{item.regular_price.currency}</div>
							</div>
							<div className={styles.quantity}>
								<button onClick={() => handleQuantityDecrease(index)}>-</button>
								<input type='text' value={quantities[index]} readOnly />
								<button onClick={() => handleQuantityIncrease(index)}>+</button>
								<button onClick={() => handleDelete(index)}>
									<AiOutlineDelete />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className={styles.order}>
				<div className={styles.total}>
					Итоговая цена: {totalPrice.toFixed(2)} USD
				</div>
				<div>
					<label>
						Имя :
						<input type='text' value={name} onChange={handleNameChange} />
					</label>
				</div>
				<div>
					<label>
						Тел. :
						<input type='text' value={phone} onChange={handlePhoneChange} />
					</label>
				</div>
				<button>Оформить заказ</button>
			</div>
		</div>
	)
}

export default Cart
