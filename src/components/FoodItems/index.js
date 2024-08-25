import {Component} from 'react'
import './index.css'
import {BiRupee} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'

class FoodItems extends Component {
  state = {isAdded: false, quantity: 0}

  componentDidMount() {
    this.findTheCartItemInList()
  }

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {eachFoodItemDetails} = this.props
    const cartItem = cartData.filter(each => each.id === eachFoodItemDetails.id)
    if (cartItem.length !== 0) {
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isAdded: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isAdded: false})
      }
    }
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachFoodItemDetails} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== eachFoodItemDetails.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  onClickAddCartItemData = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {eachFoodItemDetails} = this.props
    const cartItem = {...eachFoodItemDetails, quantity: 1}
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.findTheCartItemInList()
    this.setState({isAdded: true})
  }

  onClickIncreaseQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachFoodItemDetails} = this.props
    const updateCartData = cartData.map(eachCart => {
      if (eachCart.id === eachFoodItemDetails.id) {
        const updatedQuantity = eachCart.quantity + 1
        return {...eachCart, quantity: updatedQuantity}
      }
      return eachCart
    })
    localStorage.setItem('cartData', JSON.stringify(updateCartData))
    this.findTheCartItemInList()
  }

  onClickDecreaseQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {eachFoodItemDetails} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === eachFoodItemDetails.id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  render() {
    const {isAdded, quantity} = this.state
    console.log(isAdded)
    const {eachFoodItemDetails} = this.props
    const {cost, imageUrl, name, rating} = eachFoodItemDetails
    return (
      <li className="food-list-item" data-testid="foodItem">
        <img src={imageUrl} alt="food-item" className="food-item-img" />
        <div className="restaurant-details-container">
          <h1 className="food-restaurant-name">{name}</h1>
          <div className="restaurant-amount-container">
            <BiRupee size={20} color="#334155" />
            <p className="amount-text">{cost}.00</p>
          </div>
          <div className="restaurant-rating-container">
            <AiFillStar size={20} color="#FFCC00" />
            <p className="item rating">{rating}</p>
          </div>
          {isAdded ? (
            <div className="restaurant-quantity-container">
              <button
                type="button"
                className="quantity-button-minus"
                onClick={this.onClickDecreaseQuantity}
                aria-label="submit"
              >
                <HiOutlineMinusSm size={18} />
              </button>
              <p className="quantity-num">{quantity}</p>
              <button
                aria-label="submit"
                type="button"
                className="quantity-button-plus"
                onClick={this.onClickIncreaseQuantity}
              >
                <BsPlus size={18} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="add-btn"
              onClick={this.onClickAddCartItemData}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItems
