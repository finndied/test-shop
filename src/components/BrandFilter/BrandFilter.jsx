import React, { useState } from 'react'
import brands from '../../assets/brands.json'
import styles from './BrandFilter.module.scss'
import {ImCross} from 'react-icons/im'

const BrandFilter = ({ onBrandChange }) => {
	// временное состояние, используется во время выбора пользователем марок товаров
	const [tempCheckboxOptions, setTempCheckboxOptions] = useState(
		brands.map(brand => ({ ...brand, checked: false }))
	)
	// финальное состояние, содержит выбранные пользователем марки товаров
	const [checkboxOptions, setCheckboxOptions] = useState(
		brands.map(brand => ({ ...brand, checked: false }))
	)

	const handleBrandChange = event => {
		const brandId = parseInt(event.target.value)
		const isChecked = event.target.checked
		const updatedOptions = tempCheckboxOptions.map(option =>
			option.id === brandId ? { ...option, checked: isChecked } : option
		)
		setTempCheckboxOptions(updatedOptions)
	}

	const handleAccept = () => {
		setCheckboxOptions(tempCheckboxOptions)
		onBrandChange(
			tempCheckboxOptions
				.filter(option => option.checked)
				.map(option => option.id)
		)
	}

	const handleReset = () => {
		setTempCheckboxOptions(
			checkboxOptions.map(option => ({ ...option, checked: false }))
		)
		setCheckboxOptions(
			checkboxOptions.map(option => ({ ...option, checked: false }))
		)
		onBrandChange([])
	}

	return (
		<div className={styles.brandFilter}>
			<h3>Бренды</h3>
			{tempCheckboxOptions.map(option => (
				<div className={styles.checkBox} key={option.id}>
					<input
						type='checkbox'
						id={`brand-${option.id}`}
						value={option.id}
						checked={option.checked}
						onChange={handleBrandChange}
					/>
					<label htmlFor={`brand-${option.id}`}>{option.title}</label>
				</div>
			))}
			<div className={styles.btn}>
				<button className={styles.btnAccept} onClick={handleAccept}>Применить</button>
				<button className={styles.btnReset} onClick={handleReset}><ImCross/> Сбросить</button>
			</div>
		</div>
	)
}

export default BrandFilter
