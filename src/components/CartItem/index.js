import {BiRupee} from 'react-icons/bi'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import {MdDelete} from 'react-icons/md'

import './index.css'

const CartItem = props => {
  const {
    eachCartItemDetails,
    decreaseQuantity,
    increaseQuantity,
    deleteItem,
  } = props
  const {id, cost, imageUrl, name, quantity} = eachCartItemDetails
  const onClickDecrease = () => {
    decreaseQuantity(id)
  }
  const onClickIncrease = () => {
    increaseQuantity(id)
  }

  const onDeleteItem = () => {
    deleteItem(id)
  }
  return (
    <>
      <li className="mobile-cart-li-item-container" data-testid="cartItem">
        <img alt="cart-item" src={imageUrl} className="cart-item-img" />
        <div className="mobile-cart-item-details-container">
          <div>
            <h1 className="food-cart-name">{name}</h1>
          </div>

          <div className="cart-item-quantity-container">
            <button
              type="button"
              className="cart-item-button-minus"
              onClick={onClickDecrease}
              aria-label="submit"
            >
              <HiOutlineMinusSm size={18} />
            </button>
            <p className="cart-quantity-num">{quantity}</p>
            <button
              type="button"
              className="cart-item-button-plus"
              onClick={onClickIncrease}
              aria-label="submit"
            >
              <BsPlus size={18} />
            </button>
          </div>
          <div className="cart-item-amount-container">
            <BiRupee size={20} color="#FFA412" />
            <p className="cart-item-amount-text">{cost}.00</p>
          </div>
        </div>
        <button
          type="button"
          className="delete-btn"
          onClick={onDeleteItem}
          aria-label="submit"
        >
          <MdDelete size={25} />
        </button>
      </li>
      <li className="screen-cart-li-item-container">
        <div className="screen-image-container">
          <img alt="cart-item" src={imageUrl} className="cart-item-img" />
          <h1 className="food-cart-name">{name}</h1>
        </div>
        <div className="screen-button-container">
          <button
            type="button"
            className="cart-item-button-minus"
            aria-label="submit"
            onClick={onClickDecrease}
            data-testid="decrement-quantity"
          >
            <HiOutlineMinusSm size={18} />
          </button>
          <p className="cart-quantity-num">{quantity}</p>
          <button
            type="button"
            data-testid="increment-quantity"
            aria-label="submit"
            className="cart-item-button-plus"
            onClick={onClickIncrease}
          >
            <BsPlus size={18} />
          </button>
        </div>
        <div className="screen-price-container">
          <BiRupee size={20} color="#FFA412" />
          <p className="cart-item-amount-text">{cost}.00</p>
          <button
            className="delete-btn"
            type="button"
            onClick={onDeleteItem}
            aria-label="submit"
          >
            <MdDelete size={25} />
          </button>
        </div>
      </li>
    </>
  )
}

export default CartItem
