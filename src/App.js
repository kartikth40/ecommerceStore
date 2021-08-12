import { Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'

const App = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path={['/', '/home']}>
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
      </Switch>
    </>
  )
}

export default App
