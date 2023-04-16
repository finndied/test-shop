import React, { useEffect, useState } from 'react'
import dataProduct from '../../assets/products.json'
import dataBrands from '../../assets/brands.json'
import styles from './ProductList.module.scss'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import BrandFilter from '../BrandFilter/BrandFilter'

const ProductList = ({ handleAddToCart }) => {
	const [products, setProducts] = useState([])
	const [selectedBrands, setSelectedBrands] = useState([])
	const [currentPage, setCurrentPage] = useState(1)
	const productsPerPage = 6

	useEffect(() => {
		setProducts(dataProduct)
	}, [])

	const handleBrandChange = brands => {
		setSelectedBrands(brands)
		setCurrentPage(1)
	}

	const handlePageChange = pageNumber => {
		setCurrentPage(pageNumber)
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

	// Вычисление индексов первого и последнего товаров на текущей странице
	const indexOfLastProduct = currentPage * productsPerPage
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	)

	// Рендеринг пагинации
	const pageNumbers = []
	for (
		let i = 1;
		i <= Math.ceil(filteredProducts.length / productsPerPage);
		i++
	) {
		pageNumbers.push(i)
	}

	return (
		<div className={styles.productWrapper}>
			<BrandFilter brands={dataBrands} onBrandChange={handleBrandChange} />
			{currentProducts.length > 0 ? (
				<div className={styles.productList}>
					{currentProducts.map(product => (
						<div className={styles.card} key={product.id}>
							<h2 className={styles.productTitle}>{product.title}</h2>
							<img src={product.image} width={160} alt={product.title} />
							<div className={styles.productPrice}>
								<p>
									{product.regular_price.value} {product.regular_price.currency}
								</p>
								<button onClick={() => handleAddToCart(product)}>
									<AiOutlineShoppingCart />
								</button>
							</div>
						</div>
					))}
				</div>
			) : (
				<h2>Товаров выбранного бренда нет :(</h2>
			)}
			{pageNumbers.length > 1 && (
				<div className={styles.pagination}>
					{pageNumbers.map(pageNumber => (
						<span
							key={pageNumber}
							className={`${styles.pageNumber} ${
								pageNumber === currentPage ? styles.active : ''
							}`}
							onClick={() => handlePageChange(pageNumber)}
						>
							{pageNumber}
						</span>
					))}
				</div>
			)}
		</div>
	)
}

export default ProductList
