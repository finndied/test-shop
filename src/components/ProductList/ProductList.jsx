import React, { useEffect, useState } from 'react'
import dataProduct from '../../assets/products.json'
import styles from './ProductList.module.scss'
import {AiOutlineShoppingCart} from 'react-icons/ai'
const ProductList = () => {
	const [products, setProducts] = useState([])

	useEffect(() => {
		setProducts(dataProduct)
	}, [])

	return (
		<div className={styles.productWrapper}>
			{products.map(product => (
				<div className={styles.card} key={product.id}>
					<h2 className={styles.productTitle}>{product.title}</h2>
					<img src={product.image} width={160} alt={product.title} />
               <div className={styles.productPrice}>
					<p>{product.regular_price.value} {product.regular_price.currency}</p>
               <button>
               <AiOutlineShoppingCart/>
               </button>
               </div>
				</div>
			))}
		</div>
	)
}

export default ProductList
