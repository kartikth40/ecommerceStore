import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import laptop from '../../images/laptop.jpg'
import DropDownSelector from '../forms/DropDownSelector'
import device from '../../mediaQueries'

const Orders = ({ orders, handleStatusChange }) => {
  const statusList = [
    'Not Processed',
    'Processing',
    'Dispatched',
    'Shipped',
    'Cancelled',
  ]
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
            <div>
              <p>ORDER PLACED</p>
              <p>{getOrderedTime(order)}</p>
            </div>
            <div>
              <p>TOTAL</p>
              <p>&#8377;{getOrderTotal(order)}</p>
            </div>
            <div>
              <p>ORDERID </p>
              <p>{order._id}</p>
            </div>
            <div>
              <p>PAYMENT </p>
              <p>{order.paymentIntent.status}</p>
            </div>
            <div>
              <p>METHOD </p>
              <p>{order.paymentIntent.payment_method_types}</p>
            </div>
          </OrderLeftHeader>
          <OrderRightHeader>
            <StatusContainer status={order.orderStatus}>
              <StatusChangeTitle>STATUS:</StatusChangeTitle>
              <DropDownSelector
                value={order.orderStatus}
                name="status"
                onChangeHandler={(e) => {
                  handleStatusChange(order._id, e.target.value)
                }}
                elements={statusList}
              />
            </StatusContainer>
          </OrderRightHeader>
        </OrderHeader>
        {showOrderedProducts(order)}
      </OrderContainer>
    ))
  return (
    <Container>
      <SubHeading>User Orders</SubHeading>
      {showEachOrders()}
    </Container>
  )
}

export default Orders

const Container = styled.div`
  font-weight: bold;
  margin-right: 5rem;
  width: 100%;
`

const SubHeading = styled.h4`
  margin: 1rem 0;
  text-align: left;
  font-size: 2rem;
`

const OrderContainer = styled.div`
  border: solid 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
  position: relative;
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
  @media screen and ${device.tablet} {
    font-size: 10px;
  }
`
const OrderLeftHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & div {
    text-align: left;
    margin-right: 16px;
  }
`

const OrderRightHeader = styled.div``
const StatusContainer = styled.div`
  display: flex;
  align-items: flex-end;
  & > select {
    font-size: 15px;
    height: 100%;
    border: 2px solid rgba(0, 0, 0, 0.3);
    background-color: ${(props) =>
      props.status === 'Not Processed'
        ? 'rgba(255,100,0,.5)'
        : props.status === 'Processing'
        ? 'rgba(255,255,0,.8)'
        : props.status === 'Dispatched'
        ? 'rgba(0,200,0,.5)'
        : props.status === 'Shipped'
        ? 'rgba(0,255,0,.8)'
        : props.status === 'Cancelled'
        ? 'rgba(255,0,0,.8)'
        : 'rgba(255,255,255,1)'};
    & > option {
      background-color: white;
    }
  }

  @media screen and ${device.tablet} {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
    & select {
      font-size: 10px;
      padding: 2px;
    }
  }
`
const StatusChangeTitle = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-right: 20px;
  @media screen and ${device.tablet} {
    font-size: 10px;
  }
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
  flex-shrink: 0;
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

  @media screen and ${device.mobile} {
    font-size: 15px;
  }
`
