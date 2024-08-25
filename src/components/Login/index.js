import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    isShownError: false,
    errorMssg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitError(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, isShownError, errorMssg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1723034198/Rectangle_1457mobile_wshqdy.png"
          alt="website login"
          className="mobile-view-img"
        />
        <div className="login-details-container">
          <div className="login-card-container">
            <img
              src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1723028199/Frame_274_gugjle.png"
              alt="website logo"
              className="logo-img"
            />
            <h1 className="tasty-kitchens-text">Tasty Kitchens</h1>
            <h1 className="login-text">Login</h1>
            <form className="form-container" onSubmit={this.submitForm}>
              <label className="label-text" htmlFor="username">
                USERNAME
              </label>
              <input
                type="text"
                className="user-input"
                id="username"
                value={username}
                placeholder="rahul"
                onChange={this.onChangeUsername}
              />
              <label className="label-text" htmlFor="password">
                PASSWORD
              </label>
              <input
                value={password}
                type="password"
                className="password-input"
                id="password"
                placeholder="rahul@2021"
                onChange={this.onChangePassword}
              />
              <button className="login-button" type="submit">
                Login
              </button>
              {isShownError && <p>{errorMssg}</p>}
            </form>
          </div>
        </div>
        <img
          src="https://res.cloudinary.com/dw7dhefpb/image/upload/v1723027064/Rectangle_1456loginImage_pywld2.png"
          alt="website login"
          className="website-img"
        />
      </div>
    )
  }
}

export default Login
