import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';

import './Product.css'


const Product = props => {
    const [favsList, changeFavList] = useState([])
    const { productData } = props
    const { product_name, image_url, rating, price } = productData

    useEffect(() => {
        const url = "http://127.0.0.1:8000/user/favourite"
        const myToken = Cookies.get("jwt_token")
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",
                "Authorization": "Bearer " + myToken
            }


        }
        fetch(url, options).then(response =>
            response.json()
        ).then(data => {
            changeFavList(data)
        })
    }, [])

    const addToFav = () => {
        const url = "http://127.0.0.1:8000/favourite"
        const myToken = Cookies.get("jwt_token")
        const new_data = { "user_name": "", "product_name": product_name, "image_url": image_url, "price": price, "rating": rating }
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",
                "Authorization": "Bearer " + myToken
            },
            body: JSON.stringify(new_data)

        }
        fetch(url, options).then(response =>
            response.json()
        ).then(data => {
            console.log(data)
            getFav()
        })
    }

    const getFav = () => {
        const url = "http://127.0.0.1:8000/user/favourite"
        const myToken = Cookies.get("jwt_token")
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",
                "Authorization": "Bearer " + myToken
            }


        }
        fetch(url, options).then(response =>
            response.json()
        ).then(data => {
            changeFavList(data)
        })

    }

    const removeFromFav = () => {
        const url = "http://127.0.0.1:8000/user/favourite"
        const myToken = Cookies.get("jwt_token")
        const new_data = { "product_name": product_name }
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': "*",
                "Authorization": "Bearer " + myToken
            },
            body: JSON.stringify(new_data)

        }
        fetch(url, options).then(response =>
            response.json()
        ).then(data => {
            console.log(data)
            getFav()
        })
    }


    const clickOnIcon = () => {


        const productNamesList = favsList.map(e => e.product_name)
        if (productNamesList.includes(product_name)) {
            removeFromFav()
        } else {
            addToFav()
        }

    }


    let isFav
    const productNamesList = favsList.map(e => e.product_name)
    if (productNamesList.includes(product_name)) {
        isFav = true
    }
    else {
        isFav = false
    }

    const imageUrl = isFav ? "https://cdn.pixabay.com/photo/2020/12/09/16/40/medical-5817909_640.png" : "https://cdn.vectorstock.com/i/1000x1000/48/33/favorites-icon-black-on-white-vector-21584833.webp"

    return (

        <li className="product-item">
            <img src={image_url} alt="product" className="thumbnail" />
            <div className='add-to-favorite-container'>
                <h1 className="title">{product_name}</h1>
                <img onClick={clickOnIcon} className='add-to-favorite' src={imageUrl} alt='fav' />
            </div>

            <div className="product-details">
                <p className="price">Rs {price}/-</p>
                <div className="rating-container">
                    <p className="rating">{rating}</p>
                    <img
                        src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                        alt="star"
                        className="star"
                    />
                </div>
            </div>
        </li>

    )
}
export default Product