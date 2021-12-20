import React, {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'
import { Navigate} from 'react-router-dom'
import Header from '../Header'
import FavouriteItem from '../FavoriteItem/FavouriteItem'
import './Favorite.css'


function Favorite() {
    
    const [favorites, changeFavorites] = useState([])
    useEffect(() => {
        const url = "http://127.0.0.1:8000/user/favourite"
        const myToken = Cookies.get("jwt_token")
        const options = {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': "*",
                // 'Access-Control-Allow-Credentials': 'true',
                "Authorization": "Bearer " + myToken
            }
            
            
        }
        fetch(url, options).then(response => 
            response.json()
            ).then(data => {
                console.log(data, "null")
                changeFavorites(data)
            })
    }, [])
    console.log(favorites)

    const updateList = () => {
        console.log('updating')
        const url = "http://127.0.0.1:8000/user/favourite"
        const myToken = Cookies.get("jwt_token")
        const options = {
            method: "GET",
            headers:{
                "Content-Type":"application/json",
                'Access-Control-Allow-Origin': "*",
                // 'Access-Control-Allow-Credentials': 'true',
                "Authorization": "Bearer " + myToken
            }
            
            
        }
        fetch(url, options).then(response => 
            response.json()
            ).then(data => {
                changeFavorites(data)
            })
        
    }
    
    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken === undefined){
        return <Navigate to="/login"/>
    }
    if (favorites.length === 0){
        return(
            <><Header />
            
                
                     <div className="cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="cart"
        className="cart-img"
      />
      <h1 className='empty'>Empty View</h1>
      <Link to='/product'>
      <button type="button" className="shop-now-button">
              Add Some
            </button>
            </Link>
    </div> 
    </>

        )
    }
    return (
        <>
    <Header />

    <ul className='products-list'>
        {favorites?.map(product => <FavouriteItem refreshFav={updateList}  key={product.id} productData = {product}/>)}
    </ul>
    
  </>
    )
}

export default Favorite
