import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'

import Slider from 'react-slick'
import Loader from 'react-loader-spinner'
import {BsFilterLeft} from 'react-icons/bs'
import {IoIosArrowBack, IoIosArrowForward} from 'react-icons/io'
import Footer from '../Footer'
import RestaurantsList from '../RestaurantsList'
import Headers from '../Headers'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const apiCarouselStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
}
const apiRestaurantStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 2,
    displayText: 'Highest',
    value: 'Highest',
  },
]
const limit = 9

class Home extends Component {
  state = {
    carouselImagesData: [],
    apiCarouselStatus: apiCarouselStatusConstant.initial,
    apiRestaurantStatus: apiRestaurantStatusConstant.initial,
    activePageNumber: 1,
    selectedSortByValue: sortByOptions[0].value,
    searchInputValue: '',
    restaurantsData: [],
  }

  componentDidMount() {
    this.getCarouselData()
    this.getAllRestaurantsData()
    console.log(document.title)
  }

  getCarouselData = async () => {
    this.setState({apiCarouselStatus: apiCarouselStatusConstant.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const formattedData = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        image: eachOffer.image_url,
      }))

      this.setState({
        carouselImagesData: formattedData,
        apiCarouselStatus: apiCarouselStatusConstant.success,
      })
    }
  }

  getAllRestaurantsData = async () => {
    this.setState({apiRestaurantStatus: apiRestaurantStatusConstant.inProgress})
    const {activePageNumber, selectedSortByValue, searchInputValue} = this.state
    const offset = (activePageNumber - 1) * limit
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}&search=${searchInputValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const formattedRestaurantData = data.restaurants.map(eachRestaurant => ({
        costForTwo: eachRestaurant.cost_for_two,
        cuisine: eachRestaurant.cuisine,
        groupByTime: eachRestaurant.group_by_time,
        hasOnlineDelivery: eachRestaurant.has_online_delivery,
        hasTableBooking: eachRestaurant.has_table_booking,
        id: eachRestaurant.id,
        imageUrl: eachRestaurant.image_url,
        isDeliveringNow: eachRestaurant.is_delivering_now,
        location: eachRestaurant.location,
        menuType: eachRestaurant.menu_type,
        name: eachRestaurant.name,
        opensAt: eachRestaurant.opens_at,
        userRating: {
          rating: eachRestaurant.user_rating.rating,
          ratingColor: eachRestaurant.user_rating.rating_color,
          ratingText: eachRestaurant.user_rating.rating_text,
          totalReviews: eachRestaurant.user_rating.total_reviews,
        },
      }))
      this.setState({
        restaurantsData: formattedRestaurantData,
        apiRestaurantStatus: apiRestaurantStatusConstant.success,
      })
    } else {
      this.setState({apiRestaurantStatus: apiRestaurantStatusConstant.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="restaurants-offers-loader" className="loader-container">
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    const {carouselImagesData} = this.state
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {carouselImagesData.map(eachCarousel => (
            <img
              src={eachCarousel.image}
              alt="offer"
              key="carousel-image"
              className="carousel-image"
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderCarouselImages = () => {
    const {apiCarouselStatus} = this.state
    switch (apiCarouselStatus) {
      case apiCarouselStatusConstant.inProgress:
        return this.renderLoadingView()
      case apiCarouselStatusConstant.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  renderRestaurantLoadingView = () => (
    <div data-testid="restaurants-list-loader" className="loader-container">
      <Loader type="ThreeDots" color="#f7931e" height="50" width="50" />
    </div>
  )

  renderRestaurantSuccessView = () => {
    const {restaurantsData} = this.state
    const noRestaurantDataFound = restaurantsData.length <= 0
    return (
      <>
        {noRestaurantDataFound ? (
          <div className="no-restaurant-container">
            <p>No Restaurants Found</p>
          </div>
        ) : (
          <ul className="ul-restaurant-list">
            {restaurantsData.map(eachItem => (
              <RestaurantsList key={eachItem.id} eachItemDetails={eachItem} />
            ))}
          </ul>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <div className="no-restaurant-container">
      <p className="no-restaurant-para ">No Restaurants Found</p>
    </div>
  )

  renderAllRestaurantsDetails = () => {
    const {apiRestaurantStatus} = this.state
    switch (apiRestaurantStatus) {
      case apiRestaurantStatusConstant.inProgress:
        return this.renderRestaurantLoadingView()
      case apiRestaurantStatusConstant.success:
        return this.renderRestaurantSuccessView()
      case apiRestaurantStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  onChangeSelectedSortByValue = event =>
    this.setState(
      {selectedSortByValue: event.target.value},
      this.getAllRestaurantsData,
    )

  onChangeSearchInputValue = event =>
    this.setState(
      {searchInputValue: event.target.value},
      this.getAllRestaurantsData,
    )

  onClickDecreasePageNum = () => {
    const {activePageNumber} = this.state
    if (activePageNumber > 1) {
      this.setState(
        prevState => ({activePageNumber: prevState.activePageNumber - 1}),
        this.getAllRestaurantsData,
      )
    }
  }

  onClickIncreasePageNum = () => {
    const {activePageNumber} = this.state
    if (activePageNumber < 4) {
      this.setState(
        prevState => ({activePageNumber: prevState.activePageNumber + 1}),
        this.getAllRestaurantsData,
      )
    }
  }

  render() {
    const {selectedSortByValue, searchInputValue, activePageNumber} = this.state
    return (
      <>
        <Headers />
        <div className="home-container">
          {this.renderCarouselImages()}
          <div className="popular-restaurant-container">
            <h1 className="popular-heading">Popular Restaurants</h1>
            <div className="text-fliter-container">
              <p className="popular-para">
                Select Your favourite restaurant special dish and make your day
                happy...
              </p>
              <div className="filter-container">
                <BsFilterLeft size={30} color="#475569" />
                <p className="sort-text">sort by</p>
                <select
                  id="sortBy"
                  className="select-container"
                  value={selectedSortByValue}
                  onChange={this.onChangeSelectedSortByValue}
                >
                  {sortByOptions.map(eachOption => (
                    <option key={eachOption.id} className="options">
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <>
              <hr className="hr-line" />
            </>
            <div className="restaurant-container">
              <input
                type="search"
                id="searchInput"
                value={searchInputValue}
                onChange={this.onChangeSearchInputValue}
                className="search-input"
                placeholder="Search Restaurant Here.."
              />
              {this.renderAllRestaurantsDetails()}
            </div>
            <div className="page-details-container">
              <button
                className="page-counter-left-btn"
                type="button"
                onClick={this.onClickDecreasePageNum}
                aria-label="submit"
              >
                <IoIosArrowBack className="icon-class" size={20} />
              </button>
              <p className="page-text">
                <span>{activePageNumber}</span> of 4
              </p>
              <button
                className="page-counter-right-btn"
                type="button"
                data-testid="pagination-right-button"
                onClick={this.onClickIncreasePageNum}
                aria-label="submit"
              >
                <IoIosArrowForward className="icon-class" size={20} />
              </button>
            </div>
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
