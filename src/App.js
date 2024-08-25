import {Switch, Route} from 'react-router-dom'
import './App.css'

import Login from './components/Login'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import RestaurantsListItemDetails from './components/RestaurantsListItemDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute
      exact
      path="/restaurant/:id"
      component={RestaurantsListItemDetails}
    />
  </Switch>
)

export default App
