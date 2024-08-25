import {useState} from 'react'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiOutlineCloseCircle} from 'react-icons/ai'
import './index.css'

const Headers = props => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false)
  const [activeMobileTab, setActiveMobileTab] = useState('home')
  const [activeDesktopTab, setActiveDesktopTab] = useState('home')

  const onClickHome = () => setActiveMobileTab('home')
  const onClickcart = () => setActiveMobileTab('cart')

  const onClickDesktopHome = () => setActiveDesktopTab('home')
  const onClickDesktopcart = () => setActiveDesktopTab('cart')

  const onClickLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickMobileLogoutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const onClickMobileMenu = () =>
    setIsOpenMobileMenu(PrevSetIsOpenMobileMenu => !PrevSetIsOpenMobileMenu)

  const onClickClosebtn = () =>
    setIsOpenMobileMenu(PrevSetIsOpenMobileMenu => !PrevSetIsOpenMobileMenu)

  return (
    <>
      <div className="header-container">
        <div className="first-container">
          <Link to="/">
            <img
              src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1723269280/Frame_274header_gnafpc.png"
              alt=""
              className="header-logo"
            />
          </Link>
          <Link to="/" className="header-link">
            <h1 className="header-heading">Tasty Kitchens</h1>
          </Link>
        </div>
        <button
          type="button"
          aria-label="submit"
          className="menu-button"
          onClick={onClickMobileMenu}
        >
          <GiHamburgerMenu size={30} />
        </button>
        <ul className="second-container">
          <Link to="/" className="link">
            <button
              type="button"
              className="mobile-tab-button"
              onClick={onClickDesktopHome}
            >
              <p
                className={activeDesktopTab === 'home' ? 'activeText' : 'text'}
              >
                Home
              </p>
            </button>
          </Link>
          <Link to="/cart" className="link">
            <button
              type="button"
              className="mobile-tab-button"
              onClick={onClickDesktopcart}
            >
              <p
                className={activeDesktopTab === 'cart' ? 'activeText' : 'text'}
              >
                Cart
              </p>
            </button>
          </Link>
          <button
            className="logout-btn"
            type="button"
            onClick={onClickLogoutBtn}
          >
            Logout
          </button>
        </ul>
      </div>
      {isOpenMobileMenu && (
        <div className="mobile-menu-container">
          <ul className="mobile-first-container">
            <Link to="/" className="link">
              <button
                type="button"
                className="mobile-tab-button"
                onClick={onClickHome}
              >
                <p
                  className={
                    activeMobileTab === 'home'
                      ? 'active-mobile-text'
                      : 'mobile-text'
                  }
                >
                  Home
                </p>
              </button>
            </Link>
            <Link to="/cart" className="link">
              <button
                type="button"
                className="mobile-tab-button"
                onClick={onClickcart}
              >
                <p
                  className={
                    activeMobileTab === 'cart'
                      ? 'active-mobile-text'
                      : 'mobile-text'
                  }
                >
                  Cart
                </p>
              </button>
            </Link>
            <button
              className="mobile-logout-btn"
              type="button"
              onClick={onClickMobileLogoutBtn}
            >
              Logout
            </button>
          </ul>
          <button
            className="menu-button"
            aria-label="submit"
            type="button"
            onClick={onClickClosebtn}
          >
            <AiOutlineCloseCircle size={25} className="close-btn" />
          </button>
        </div>
      )}
    </>
  )
}

export default withRouter(Headers)
