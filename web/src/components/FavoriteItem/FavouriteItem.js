import Cookies from 'js-cookie'
import './FavouriteItem.css'


const FavouriteItem = props => {
  const {productData, refreshFav} = props
  const {id,product_name, image_url, rating, price} = productData

  const changeList = () => {
      refreshFav()
  }

  
  const removeFromFav = () =>{
    const url = `http://127.0.0.1:8000/user/favourite/delete/${id}`
    const myToken = Cookies.get("jwt_token")
    const new_data = {"product_name": product_name}
    const options = {
        method: "DELETE",
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
            changeList()
        })
}

 

  return (

<li className="product-item">
      <img src={image_url} alt="product" className="thumbnail" />
      <div className='add-to-favorite-container'>
      <h1 className="title">{product_name}</h1>
      <img onClick={removeFromFav}  className='add-to-favorite' src='https://cdn.vectorstock.com/i/1000x1000/02/33/delete-icon-blue-monochrome-color-vector-23770233.webp' alt='delete'/>
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

  )
}
export default FavouriteItem