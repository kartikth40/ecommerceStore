import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import laptop from '../../images/laptop.jpg'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'

const History = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const dispatch = useDispatch()

  useEffect(() => {
    loadUserOrders()
  }, [])

  const loadUserOrders = async () => {
    let token = await getRefreshedIdToken()
    getUserOrders(token)
      .then((res) => {
        setOrders(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        toast.error('Error in getting your previous orders')
      })
  }

  const getOrderedTime = (order) => {
    let orderDate = new Date(order.createdAt)
    let date = orderDate.getDate().toString()
    let month = orderDate.toLocaleString('default', { month: 'long' })
    let year = orderDate.getFullYear().toString()
    orderDate = `${date} ${month} ${year}`
    return orderDate
  }

  const inrCurrencyFormat = (amount) => {
    return amount.toString().replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') // to indian currency formatting - commas
  }
  const getOrderTotal = (order) => {
    return inrCurrencyFormat((order.paymentIntent.amount / 100).toFixed(2))
  }

  const handleBuyAgain = (product) => {
    // create cart array
    let cart = []
    if (window) {
      // check if cart is already in localStorage
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product
      cart.push({
        ...product,
        count: 1,
      })
      // remove duplicates
      cart = cart.filter(
        (product, index, array) =>
          array.findIndex((p) => p._id == product._id) == index
      )
      localStorage.setItem('cart', JSON.stringify(cart))

      //add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
      //show cart items inside drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
    }
  }

  const showOrderedProducts = (order) => (
    <OrderProductsContainer>
      <OrderStatus>{order.orderStatus} </OrderStatus>
      {order.products.map((product) => (
        <ProductContainer key={product._id}>
          <ProductImage to={`/product/${product.product.slug}`}>
            <Img
              src={
                product.product.images ? product.product.images[0].url : laptop
              }
              alt="product"
            />
          </ProductImage>
          <ProductInfo>
            <ProductName to={`/product/${product.product.slug}`}>
              {`${product.product.title} x${product.count} - ${product.color}`}
            </ProductName>
            <BuyAgainButton
              disabled={product.product.quantity < 1}
              onClick={() => handleBuyAgain(product.product)}
            >
              Buy it again
            </BuyAgainButton>
          </ProductInfo>
        </ProductContainer>
      ))}
    </OrderProductsContainer>
  )

  const showEachOrders = () =>
    orders.map((order, index) => (
      <OrderContainer key={index}>
        <OrderHeader>
          <OrderLeftHeader>
            <OrderPlaced>
              <p>ORDER PLACED</p>
              <p>{getOrderedTime(order)}</p>
            </OrderPlaced>
            <OrderTotal>
              <p>TOTAL</p>
              <p>&#8377;{getOrderTotal(order)}</p>
            </OrderTotal>
          </OrderLeftHeader>
          <OrderRightHeader>
            <p>ORDER# {order._id}</p>
            <StyledLink to={`/user/orderDetails/${order._id}`}>
              View order details
            </StyledLink>
          </OrderRightHeader>
        </OrderHeader>
        {showOrderedProducts(order)}
      </OrderContainer>
    ))

  return (
    <Container>
      <UserNav />
      <Content>
        <Heading>
          {loading
            ? 'Loading Your Orders...'
            : orders.length
            ? 'Your Orders'
            : 'No previous orders'}
        </Heading>
        {showEachOrders()}
      </Content>
    </Container>
  )
}

export default History

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Content = styled.div`
  text-align: center;
  font-weight: bold;
  margin-right: 5rem;
  width: 100%;
`
const Heading = styled.h4`
  margin: 1rem 0;
  text-align: left;
  font-size: 3rem;
`
const OrderContainer = styled.div`
  border: solid 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
`
const OrderHeader = styled.div`
  border-bottom: solid 2px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
`
const OrderLeftHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const OrderPlaced = styled.div`
  margin-right: 30px;
  text-align: left;
`
const OrderTotal = styled.div`
  text-align: left;
`
const OrderRightHeader = styled.div`
  text-align: right;
`
const OrderProductsContainer = styled.div`
  padding: 10px 20px;
`
const OrderStatus = styled.div`
  font-size: 20px;
  text-align: left;
`
const ProductContainer = styled.div`
  display: flex;
  padding: 20px 0;
`
const ProductImage = styled(Link)`
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 10px;
  overflow: hidden;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const ProductInfo = styled.div`
  width: 400px;
  text-align: left;
`
const ProductName = styled(Link)`
  display: block;
  font-weight: 400;
  font-size: 25px;
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
  &:hover {
    text-decoration: underline;
  }
`
const BuyAgainButton = styled.button`
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-top: 5px;
  font-size: 15px;
  background-color: rgba(230, 230, 0, 1);
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 0, 1);
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: blue;
  &:visited {
    color: blue;
  }
  &:hover {
    text-decoration: underline;
  }
`
