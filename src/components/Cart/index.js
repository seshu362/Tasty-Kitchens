import {Component} from 'react'
import {Link} from 'react-router-dom'

import {BiRupee} from 'react-icons/bi'
import Loader from 'react-loader-spinner'
import Headers from '../Headers'
import Footer from '../Footer'
import CartItem from '../CartItem'

import './index.css'

const apiCartStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  paymentSuccess: 'PAYMENT_SUCCESS',
}

class Cart extends Component {
  state = {
    cartStatus: apiCartStatusConstant.initial,
    cartData: [],
  }

  componentDidMount() {
    this.getCartData()
  }

  getCartData = () => {
    this.setState({cartStatus: apiCartStatusConstant.inProgress})
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    if (cartData.length === 0) {
      console.log(cartData.length)
      this.setState({
        cartStatus: apiCartStatusConstant.failure,
      })
    } else {
      const cartItems = cartData.map(each => ({
        cost: each.cost,
        quantity: each.quantity,
        id: each.id,
        imageUrl: each.imageUrl,
        name: each.name,
      }))
      const filterCardQuantityList = cartItems.filter(
        eachCart => eachCart.quantity > 0 && eachCart.cost !== undefined,
      )
      this.setState({
        cartData: filterCardQuantityList,
        cartStatus: apiCartStatusConstant.success,
      })
    }
  }

  renderFailureView = () => (
    <div className="empty-cart-container">
      <img
        src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1723453643/cart-no-order_kmnns9.png"
        alt="empty cart"
        className="empty-cart-img"
      />
      <h1 className="no-order-heading">No Orders Yet!</h1>
      <p className="no-order-para">
        Your cart is empty. Add something <br /> from the menu.
      </p>
      <Link to="/">
        <button type="button" className="order-now-btn">
          Order Now
        </button>
      </Link>
    </div>
  )

  renderPaymentSuccessView = () => (
    <div className="payment-success-container">
      <img
        src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1723454765/check-circle.1_1paymentSuccess_r9ta4q.png"
        alt="empty cart"
        className="payment-success-img"
      />
      <h1 className="payment-success-heading">Payment Successful</h1>
      <p className="payment-success-para">
        Thank you for ordering <br />
        Your payment is successfully completed.
      </p>
      <button
        className="goto-home-btn"
        type="button"
        onClick={this.onClickGoToHomePage}
      >
        Go To Home Page
      </button>
    </div>
  )

  renderCartLoadingView = () => (
    <div className="cart-loading-container">
      <Loader type="TailSpin" color="#F7931E" height="50" width="50" />
    </div>
  )

  renderCartRoutePage = () => {
    const {cartStatus} = this.state
    switch (cartStatus) {
      case apiCartStatusConstant.inProgress:
        return this.renderCartLoadingView()
      case apiCartStatusConstant.success:
        return this.renderCartSuccessView()
      case apiCartStatusConstant.failure:
        return this.renderFailureView()
      case apiCartStatusConstant.paymentSuccess:
        return this.renderPaymentSuccessView()
      default:
        return null
    }
  }

  decreaseQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cardData', JSON.stringify(updatedCartData))
    this.getCartData()
    this.removeCartItem(updatedCartData)
  }

  removeCartItem = updatedData => {
    const updatedCartData = updatedData.filter(
      eachCartItem => eachCartItem.quantity > 0,
    )
    console.log(updatedCartData)
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  increaseQuantity = id => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === id) {
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.getCartData()
  }

  deleteItem = id => {
    const {cartData} = this.state
    const filterCartdataDelete = cartData.filter(each => each.id !== id)
    localStorage.setItem('cartData', JSON.stringify(filterCartdataDelete))
    this.getCartData()
  }

  onClickPlaceOrder = () => {
    this.setState({cartStatus: apiCartStatusConstant.paymentSuccess})
  }

  onClickGoToHomePage = () => {
    const {history} = this.props
    history.replace('/')
    localStorage.clear()
  }

  getOrderTotalAmount = () => {
    const {cartData} = this.state
    const amountList = cartData.map(each => each.quantity * each.cost)
    const orderTotal = amountList.reduce((a, b) => a + b)
    return orderTotal
  }

  renderCartSuccessView = () => {
    const {cartData, cartStatus} = this.state
    console.log(cartStatus)
    const orderTotal = this.getOrderTotalAmount()
    return (
      <div className="cart-item-container">
        <div className="item-header-container">
          <h1 className="heading-name">Item</h1>
          <h1 className="heading-name">Quantity</h1>
          <h1 className="heading-name">Price</h1>
        </div>
        <ul className="ul-list-items-container">
          {cartData.map(eachCartItem => (
            <CartItem
              eachCartItemDetails={eachCartItem}
              key={eachCartItem.id}
              decreaseQuantity={this.decreaseQuantity}
              increaseQuantity={this.increaseQuantity}
              deleteItem={this.deleteItem}
            />
          ))}
        </ul>
        <div className="order-total-container">
          <h1 className="order-total-text">Order Total : </h1>
          <div className="amount-icon-container">
            <BiRupee size={20} color="#3e4c59" />
            <p className="amount-text">{orderTotal}.00</p>
          </div>
        </div>
        <div className="place-order-btn-container">
          <button
            className="place-order-btn"
            type="button"
            onClick={this.onClickPlaceOrder}
          >
            Place Order
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  render() {
    return (
      <div className="cart-bg-container">
        <Headers />
        {this.renderCartRoutePage()}
      </div>
    )
  }
}
export default Cart
