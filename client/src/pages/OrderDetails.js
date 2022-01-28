import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import UserNav from '../components/nav/UserNav'
import { useParams } from 'react-router'
import { getOrder } from '../functions/user'
import { useSelector } from 'react-redux'
import { showOrderedProducts } from './user/History'
import laptop from '../images/laptop.jpg'

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    getOrder(orderId, user.token).then((res) => {
      console.log(res.data.order)
      setOrder(res.data.order)
    })
  }, [])

  const showOrderedProducts = (order) => (
    <OrderProductsContainer>
      <OrderStatus>Delivered 20-Sept-2021</OrderStatus>
      {order &&
        order.products &&
        order.products.map((product) => (
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

  return (
    <Container>
      <UserNav />
      <Content>
        <Heading>Order Details</Heading>
        <OrderDate>Ordered on 19 Sept 2021</OrderDate>
        <OrderDetailsContainer>
          <ShippingAddress>
            <SubHeading>Shipping Address</SubHeading>
            <Address>
              <p>Kartik thakur </p>
              <p>C-78 New palam vihar,</p>
              <p>phase1 GURUGRAM, </p>
              <p>HARYANA 122017</p>
              <p>India</p>
            </Address>
          </ShippingAddress>
          <PaymentMethod>
            <SubHeading>Payment Method</SubHeading>
            <PaymentMethodContent>Card</PaymentMethodContent>
          </PaymentMethod>
          <OrderSummary>
            <SubHeading>Order Summary</SubHeading>
            <OrderSummaryContent>
              <Payments>
                <Left>Item(s) Subtotal:</Left>
                <Right>Rs. 200</Right>
              </Payments>
              <Payments>
                <Left>Coupon amount: </Left>
                <Right>-Rs. 0</Right>
              </Payments>
              <Payments>
                <Left>Total: </Left>
                <Right>Rs. 200</Right>
              </Payments>
              <GrandTotal>
                <Left>Grand Total: </Left>
                <Right>Rs. 200.00</Right>
              </GrandTotal>
            </OrderSummaryContent>
          </OrderSummary>
        </OrderDetailsContainer>
        {showOrderedProducts(order)}
      </Content>
    </Container>
  )
}

export default OrderDetails

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
const OrderDate = styled.div`
  text-align: left;
  margin: 10px 0;
  font-weight: 400;
`
const OrderDetailsContainer = styled.div`
  border: solid 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 10px 20px;
`
const ShippingAddress = styled.div`
  width: 300px;
  text-align: left;
`
const Address = styled.div`
  font-weight: 400;
`
const SubHeading = styled.div`
  font-size: 20px;
  margin-bottom: 20px;
`
const PaymentMethod = styled.div`
  text-align: left;
  width: 300px;
`
const PaymentMethodContent = styled.div`
  font-weight: 400;
`
const OrderSummary = styled.div`
  text-align: left;
  width: 300px;
`
const OrderSummaryContent = styled.div`
  font-weight: 400;
`
const Payments = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`
const GrandTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-weight: 600;
`
const Left = styled.div``
const Right = styled.div``

const OrderProductsContainer = styled.div`
  border: solid 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
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
