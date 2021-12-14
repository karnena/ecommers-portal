import './FavouriteItem.css'


const FavouriteItem = props => {
  const {productData} = props
  const {product_name, image_url, rating, price} = productData

 

  return (

<li className="product-item">
      <img src={image_url} alt="product" className="thumbnail" />
      <div className='add-to-favorite-container'>
      <h1 className="title">{product_name}</h1>
      <img  className='add-to-favorite' src='https://cdn.vectorstock.com/i/1000x1000/02/33/delete-icon-blue-monochrome-color-vector-23770233.webp' alt='delete'/>
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