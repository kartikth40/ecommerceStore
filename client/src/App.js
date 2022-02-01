import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import Header from './components/nav/Header'
import RegisterComplete from './pages/auth/RegisterComplete'
import ForgotPassword from './pages/auth/ForgotPassword'

import UserRoute from './components/routes/UserRoute'
import History from './pages/user/History'
import Password from './pages/user/Password'
import Wishlist from './pages/user/Wishlist'

import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import CategoryCreate from './pages/admin/category/CategoryCreate'
import CategoryUpdate from './pages/admin/category/CategoryUpdate'
import SubCreate from './pages/admin/sub/SubCreate'
import SubUpdate from './pages/admin/sub/SubUpdate'

import ProductCreate from './pages/admin/product/ProductCreate'
import AllProducts from './pages/admin/product/AllProducts'
import ProductUpdate from './pages/admin/product/ProductUpdate'

import CategoryHome from './pages/category/CategoryHome'

import { auth } from './firebase'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// currentUser function takes token of the user id token and sends the user info to the backend server
import { currentUser } from './functions/auth'

import Product from './pages/Product'
import SubHome from './pages/sub/SubHome'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import SideDrawer from './components/drawer/SideDrawer'
import Checkout from './pages/Checkout'
import CreateCoupon from './pages/admin/coupon/CreateCoupon'
import Payment from './pages/Payment'
import OrderDetails from './pages/OrderDetails'

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
  }, [dispatch])
  return (
    <>
      <Header />
      <SideDrawer />
      <ToastContainer position="bottom-right" closeOnClick />
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

        <UserRoute exact path="/user/history">
          <History />
        </UserRoute>
        <UserRoute exact path="/user/password">
          <Password />
        </UserRoute>
        <UserRoute exact path="/user/wishlist">
          <Wishlist />
        </UserRoute>
        <UserRoute exact path="/user/orderDetails/:orderId">
          <OrderDetails />
        </UserRoute>
        <UserRoute exact path="/payment">
          <Payment />
        </UserRoute>

        <AdminRoute exact path="/admin/dashboard">
          <AdminDashboard />
        </AdminRoute>
        <AdminRoute exact path="/admin/category">
          <CategoryCreate />
        </AdminRoute>
        <AdminRoute exact path="/admin/category/:slug">
          <CategoryUpdate />
        </AdminRoute>
        <AdminRoute exact path="/admin/sub">
          <SubCreate />
        </AdminRoute>
        <AdminRoute exact path="/admin/sub/:slug">
          <SubUpdate />
        </AdminRoute>
        <AdminRoute exact path="/admin/product">
          <ProductCreate />
        </AdminRoute>
        <AdminRoute exact path="/admin/products">
          <AllProducts />
        </AdminRoute>
        <AdminRoute exact path="/admin/product/:slug">
          <ProductUpdate />
        </AdminRoute>
        <AdminRoute exact path="/admin/coupons">
          <CreateCoupon />
        </AdminRoute>

        <Route exact path="/product/:slug">
          <Product />
        </Route>
        <Route exact path="/category/:slug">
          <CategoryHome />
        </Route>
        <Route exact path="/sub/:slug">
          <SubHome />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/payment">
          <Payment />
        </Route>
      </Switch>
    </>
  )
}

export default App
