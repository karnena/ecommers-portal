import './Product.css'
import Grid from '@mui/material/Grid';

const Product = props => {
  const {productData} = props
  const {product_name, image_url, rating, price} = productData

  return (
//  <Grid container spacing={2}>
// <Grid item xs={12} sm={6} md={4}>
<li className="product-item">
      <img src={image_url} alt="product" className="thumbnail" />
      <div className='add-to-favorite-container'>
      <h1 className="title">{product_name}</h1>
      <img className='add-to-favorite' src='https://cdn.vectorstock.com/i/1000x1000/48/33/favorites-icon-black-on-white-vector-21584833.webp' alt='fav'/>
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