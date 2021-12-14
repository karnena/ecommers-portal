import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';
import './Product.css'
import Grid from '@mui/material/Grid';

const Product = props => {
  const {productData} = props
  const {product_name, image_url, rating, price} = productData

  const addToFav = () =>{
    const url = "http://127.0.0.1:8000/favourite"
    const myToken = Cookies.get("jwt_token")
    const new_data = {"user_name": "", "product_name": product_name, "image_url":image_url, "price": price, "rating": rating}
    const options = {
        method: "POST",
        headers:{
            "Content-Type":"application/json",
            'Access-Control-Allow-Origin': "*",
            "Authorization": "Bearer " + myToken
        },
        body:JSON.stringify(new_data)
        
    }
    fetch(url, options).then(response => 
        response.json()
        ).then(data => {
            console.log(data)
        })
}

  return (

<li className="product-item">
      <img src={image_url} alt="product" className="thumbnail" />
      <div className='add-to-favorite-container'>
      <h1 className="title">{product_name}</h1>
      <img onClick={addToFav} className='add-to-favorite' src='https://cdn.vectorstock.com/i/1000x1000/48/33/favorites-icon-black-on-white-vector-21584833.webp' alt='fav'/>
      </div>
      {/* <p className="brand">by {brand}</p> */}
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
// </Grid>
//  </Grid>
  )
}
export default Product