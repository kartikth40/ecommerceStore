import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// currentUser function takes token of the user id token and sends the user info to the backend server
import { currentUser } from './functions/auth'

const App = () => {
  const dispatch = useDispatch()
  // to check firebase auth state
  useEffect(() => {
    // auth.onAuthStateChanged - firebase buildin function to check the change in auth state of a user
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult()

        currentUser(idTokenResult.token)
          .then((res) => {
            // it will get response from */api/current-user, which is responding the users data from backend
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                id: res.data._id,
              },
            })
          })
          .catch((err) => console.log(err.message))
      }
    })

    //cleanup
    return () => unsubscribe()
  }, [])
  return (
    <>
      <Header />
      <ToastContainer />
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
        <Route exact path="/register/complete">
          <RegisterComplete />
        </Route>
        <Route exact path="/forgot/password">
          <ForgotPassword />
        </Route>
      </Switch>
    </>
  )
}

export default App
