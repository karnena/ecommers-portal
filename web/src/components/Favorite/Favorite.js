import React from 'react'
import Cookies from 'js-cookie'
import {Link, Navigate} from 'react-router-dom'
import Header from '../Header'
import './Favorite.css'
function Favorite() {
    const jwtToken = Cookies.get("jwt_token")
    if (jwtToken === undefined){
        return <Navigate to="/login"/>
    }
    return (
        <>
    <Header />
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

export default Favorite
