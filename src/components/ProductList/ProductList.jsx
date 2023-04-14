import React, { useEffect, useState } from 'react'
import dataProduct from '../../assets/products.json'
import dataBrands from '../../assets/brands.json'
import styles from './ProductList.module.scss'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import BrandFilter from '../BrandFilter/BrandFilter'

const ProductList = () => {
	const [products, setProducts] = useState([])
	const [selectedBrands, setSelectedBrands] = useState([])

	useEffect(() => {
		setProducts(dataProduct)
	}, [])

	const handleBrandChange = brands => {
		setSelectedBrands(brands)
	}

	// Фильтрация товаров по выбранным брендам
	const filteredProducts = products.filter(product => {
		if (selectedBrands.length === 0) {
			// Если ни один бренд не выбран, показать все товары
			return true
		} else {
			// Если выбраны бренды, показать только товары, соответствующие выбранным брендам
			return selectedBrands.includes(product.brand)
		}
	})

	return (
		<div className={styles.productWrapper}>
			<BrandFilter brands={dataBrands} onBrandChange={handleBrandChange} />
			{filteredProducts.length > 0 ? (
				<div className={styles.productList}>
					{filteredProducts.map(product => (
						<div className={styles.card} key={product.id}>
							<h2 className={styles.productTitle}>{product.title}</h2>
							<img src={product.image} width={160} alt={product.title} />
							<div className={styles.productPrice}>
								<p>
									{product.regular_price.value} {product.regular_price.currency}
								</p>
								<button>
									<AiOutlineShoppingCart />
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<h2>Товаров выбранного бренда нет :(</h2>
			)}
		</div>
	)
}

export default ProductList
