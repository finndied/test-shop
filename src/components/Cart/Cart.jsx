import React, { useState } from 'react'
import styles from './Cart.module.scss'
import { AiOutlineDelete } from 'react-icons/ai'
import { GiConfirmed } from 'react-icons/gi'
const Cart = ({ cartItems, handleDelete, handleClearCart }) => {
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [quantities, setQuantities] = useState(cartItems.map(item => 1))
	const [showModal, setShowModal] = useState(false)
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

	const handleOrderSubmit = async () => {
		// Проверяем заполнены ли поля "имя" и "телефон"
		if (!name || !phone) {
			alert('Пожалуйста, заполните поля "Имя" и "Телефон"')
			return
		}
		const orderData = {
			name,
			phone,
			items: cartItems.map((item, index) => ({
				id: item.id,
				title: item.title,
				price: item.regular_price.value,
				quantity: quantities[index]
			})),
			total: totalPrice
		}
		try {
			const response = await fetch('https://app.aaccent.su/js/confirm.php', {
				method: 'POST',
				body: JSON.stringify(orderData)
			})
			const data = await response.json()
			if (data.result === 'ok') {
				setShowModal(true)
				setQuantities(cartItems.map(item => 1))
				setName('')
				setPhone('')
				handleClearCart()
			} else {
				alert('Произошла ошибка при оформлении заказа')
			}
		} catch (error) {
			console.error('Ошибка:', error)
			alert('Произошла ошибка при оформлении заказа')
		}
	}

	const handleCloseModal = () => {
		setShowModal(false)
		window.location.href = '/'
	}
	return (
		<div className={styles.cart}>
			{cartItems.length === 0 ? (
				<div className={styles.emptyCart}>В вашей корзине пусто</div>
			) : (
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
									<button onClick={() => handleQuantityDecrease(index)}>
										-
									</button>
									<input type='text' value={quantities[index]} readOnly />
									<button onClick={() => handleQuantityIncrease(index)}>
										+
									</button>
									<button onClick={() => handleDelete(index)}>
										<AiOutlineDelete />
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			)}
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
				<button onClick={handleOrderSubmit} disabled={cartItems.length === 0}>
					Оформить заказ
				</button>
			</div>
			{showModal && (
				<div className={styles.modal}>
					<div className={styles.modalContent}>
						<GiConfirmed />
						<h2>Заказ оформлен!</h2>
						<button onClick={handleCloseModal}>Закрыть</button>
					</div>
				</div>
			)}
		</div>
	)
}

export default Cart
