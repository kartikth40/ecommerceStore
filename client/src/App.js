import { useEffect, lazy, Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { auth } from './firebase'
import { useDispatch } from 'react-redux'
// currentUser function takes token of the user id token and sends the user info to the backend server
import { currentUser } from './functions/auth'

// using lazy loading

const Login = lazy(() => import('./pages/auth/Login'))
const Register = lazy(() => import('./pages/auth/Register'))
const Home = lazy(() => import('./pages/Home'))
const Header = lazy(() => import('./components/nav/Header'))
const RegisterComplete = lazy(() => import('./pages/auth/RegisterComplete'))
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'))
const UserRoute = lazy(() => import('./components/routes/UserRoute'))
const History = lazy(() => import('./pages/user/History'))
const Password = lazy(() => import('./pages/user/Password'))
const Wishlist = lazy(() => import('./pages/user/Wishlist'))
const AdminRoute = lazy(() => import('./components/routes/AdminRoute'))
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'))
const CategoryCreate = lazy(() =>
  import('./pages/admin/category/CategoryCreate')
)
const CategoryUpdate = lazy(() =>
  import('./pages/admin/category/CategoryUpdate')
)
const SubCreate = lazy(() => import('./pages/admin/sub/SubCreate'))
const SubUpdate = lazy(() => import('./pages/admin/sub/SubUpdate'))
const ProductCreate = lazy(() => import('./pages/admin/product/ProductCreate'))
const AllProducts = lazy(() => import('./pages/admin/product/AllProducts'))
const ProductUpdate = lazy(() => import('./pages/admin/product/ProductUpdate'))
const CategoryHome = lazy(() => import('./pages/category/CategoryHome'))
const Product = lazy(() => import('./pages/Product'))
const SubHome = lazy(() => import('./pages/sub/SubHome'))
const Shop = lazy(() => import('./pages/Shop'))
const Cart = lazy(() => import('./pages/Cart'))
const SideDrawer = lazy(() => import('./components/drawer/SideDrawer'))
const Checkout = lazy(() => import('./pages/Checkout'))
const CreateCoupon = lazy(() => import('./pages/admin/coupon/CreateCoupon'))
const Payment = lazy(() => import('./pages/Payment'))
const OrderDetails = lazy(() => import('./pages/OrderDetails'))

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
    <Suspense
      fallback={
        <div className="full-page">
          <div className="spinner black"></div>
        </div>
      }
    >
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
    </Suspense>
  )
}

export default App
