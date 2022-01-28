import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'
import { getUserOrders } from '../../functions/user'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'
import laptop from '../../images/laptop.jpg'

const History = () => {
  const [orders, setOrders] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadUserOrders()
  }, [])

  const loadUserOrders = () => {
    getUserOrders(user.token).then((res) => {
      setOrders(res.data)
    })
  }

  const showOrderedProducts = (order) => (
    <OrderProductsContainer>
      <OrderStatus>Delivered 20-Sept-2021</OrderStatus>
      {order.products.map((product) => (
        <ProductContainer>
          <ProductImage>
            <Img src={laptop} alt="product" />
          </ProductImage>
          <ProductInfo>
            <ProductName>dfagfafgsafdgsdfgsdfgsfg</ProductName>
            <BuyAgainButton>Buy it again</BuyAgainButton>
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
              <p>18 sept 2021</p>
            </OrderPlaced>
            <OrderTotal>
              <p>TOTAL</p>
              <p>Rs.600.00</p>
            </OrderTotal>
          </OrderLeftHeader>
          <OrderRightHeader>
            <p>ORDER #23424-2342-2342</p>
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
          {orders.length ? 'Your Orders' : 'No previous orders'}
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
const Heading = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
  text-align: left;
`
const OrderContainer = styled.div`
  border: solid 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
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
const ProductImage = styled.div`
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
  width: 200px;
  text-align: left;
`
const ProductName = styled.p``
const BuyAgainButton = styled.button``
const StyledLink = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`
