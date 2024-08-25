import {Link} from 'react-router-dom'
import './index.css'
import {FaStar} from 'react-icons/fa'

const RestaurantsList = props => {
  const {eachItemDetails} = props
  const {imageUrl, name, cuisine, id, userRating} = eachItemDetails
  const {rating, totalReviews} = userRating
  return (
    <>
      <Link to={`/restaurant/${id}`} className="link">
        <li
          className="mobile-list-restaurant-items"
          data-testid="restaurant-item"
        >
          <img src={imageUrl} alt="restaurant" className="restaurant-images" />
          <div className="restaurant-details-bg-container">
            <h1 className="restaurant-name-heading">{name}</h1>
            <p className="restaurant-cuisine-para">{cuisine}</p>
            <div className="rating-container-home">
              <FaStar size={15} color="#FFCC00" />
              <p className="rating-restaurant">{rating}</p>
              <p className="reviews-restaurant">({totalReviews} ratings)</p>
            </div>
          </div>
        </li>
      </Link>

      <Link to={`/restaurant/${id}`} className="link">
        <li
          className="screen-list-restaurant-items "
          data-testid="restaurant-item"
        >
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-screen-images"
          />
          <div className="screen-restaurant-details-bg-container">
            <h1 className="screen-restaurant-name-heading">{name}</h1>
            <p className="screen-restaurant-cuisine-para">{cuisine}</p>
            <div className="screen-rating-container-home">
              <FaStar size={20} color="#FFCC00" />
              <p className="screen-rating-restaurant">{rating}</p>
              <p className="screen-reviews-restaurant">
                ({totalReviews} ratings)
              </p>
            </div>
          </div>
        </li>
      </Link>
    </>
  )
}

export default RestaurantsList
