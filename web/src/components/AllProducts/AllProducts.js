import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import Header from '../Header'
import Product from '../Product/Product'
import './AllProducts.css'


function AllProducts() {
    const [products, setProducts] = useState([])
    const [searchInput, changeSearchInput] = useState('')
    const changeValue = e => {
        changeSearchInput(e.target.value)
    }
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
    const filteredProducts = products.filter(product => product.product_name.toLowerCase().includes(searchInput.toLowerCase()))
    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken === undefined){
        return <Navigate to ="/loign"/>
    }
    return (<>
    <Header/>
    <input placeholder='Search by name' className='search' type='search' onChange={changeValue} />
    <h1 className='products-heading'>All Products</h1>
            <ul className="products-list">
                {filteredProducts.map(product => <Product key={product.id} productData = {product}/>)}
            </ul>
            </>
    )
}

export default AllProducts
