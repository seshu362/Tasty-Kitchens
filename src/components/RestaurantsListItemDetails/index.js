import {Component} from 'react'
import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {BiRupee} from 'react-icons/bi'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import FoodItems from '../FoodItems'
import Headers from '../Headers'
import Footer from '../Footer'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class RestaurantsListItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    restaurantItemsData: [],
  }

  componentDidMount() {
    this.getRestaurantItemsData()
  }

  getRestaurantItemsData = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        restaurantId: data.id,
        imageUrl: data.image_url,
        itemCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
        foodItems: data.food_items.map(eachItem => ({
          cost: eachItem.cost,
          foodType: eachItem.food_type,
          id: eachItem.id,
          imageUrl: eachItem.image_url,
          name: eachItem.name,
          rating: eachItem.rating,
        })),
      }
      this.setState({
        restaurantItemsData: formattedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderListRestaurantLoadingView = () => (
    <div
      className="list-restaurant-loader-bg-container"
      data-testid="restaurant-details-loader"
    >
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderListRestaurantSuccessView = () => {
    const {restaurantItemsData} = this.state
    const {
      costForTwo,
      name,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
      foodItems,
    } = restaurantItemsData
    return (
      <>
        <div className="restaurants-header-container">
          <img
            src={imageUrl}
            alt="restaurant"
            className="restaurant-header-img"
          />
          <div className="restaurant-header-details-container">
            <h1 className="restaurant-heading">{name}</h1>
            <p className="restaurant-para">{cuisine}</p>
            <p className="restaurant-para">{location}</p>
            <div className="rating-container">
              <div className="column-box">
                <p className="rating-number">
                  <span className="span">
                    <AiFillStar size={19} />
                  </span>
                  {rating}
                </p>
                <p className="ratings">{reviewsCount}- Ratings</p>
              </div>
              <div className="column-box">
                <p className="rating-number">
                  <span className="span">
                    <BiRupee size={19} />
                  </span>
                  {costForTwo}
                </p>
                <p className="ratings">Cost of Two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-item-list">
          {foodItems.map(eachFoodItem => (
            <FoodItems
              key={eachFoodItem.id}
              eachFoodItemDetails={eachFoodItem}
            />
          ))}
        </ul>
      </>
    )
  }

  renderListRestaurantFailureView = () => (
    <div className="failure-no-restaurantlist-container">
      <p className="failure-no-restaurantlist-para">No Restaurants Found</p>
    </div>
  )

  renderListRestaurantsDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderListRestaurantLoadingView()
      case apiStatusConstant.success:
        return this.renderListRestaurantSuccessView()
      case apiStatusConstant.failure:
        return this.renderListRestaurantFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Headers />
        {this.renderListRestaurantsDetails()}
        <Footer />
      </>
    )
  }
}

export default RestaurantsListItemDetails
