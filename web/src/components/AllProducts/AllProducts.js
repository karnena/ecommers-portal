import React, {useState, useEffect} from 'react'
import Header from '../Header'
import Product from '../Product/Product'
import './AllProducts.css'


function AllProducts() {
    const [products, setProducts] = useState([])
    useEffect(()=>{
        fetch('http://127.0.0.1:8000/product').then(
            response => {
                return response.json()
            }
        ).then(
            data => {
                setProducts(data)
            }
        )
    }, [])
    console.log(products)
    return (<>
    <Header/>
            <ul className="products-list">
                {products.map(product => <Product key={product.id} productData = {product}/>)}
            </ul>
            </>
    )
}

export default AllProducts
