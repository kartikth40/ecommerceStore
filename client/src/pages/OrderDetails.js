import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import UserNav from '../components/nav/UserNav'
import { useParams } from 'react-router'
import { getOrder, getAddressFromDb } from '../functions/user'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import laptop from '../images/laptop.jpg'
import { getRefreshedIdToken } from '../functions/getRefreshedIdToken'

const OrderDetails = () => {
  const { orderId } = useParams()
  const [order, setOrder] = useState([])
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    let userToken = await getRefreshedIdToken()
    getOrder(orderId, userToken)
      .then((res) => {
        setOrder(res.data.order)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
    getAddressFromDb(userToken).then((res) => setAddress(res.data))
  }, [])

  const dispatch = useDispatch()

  const getOrderedTime = (order) => {
    let orderDate = new Date(order.createdAt)
    let date = orderDate.getDate().toString()
    let month = orderDate.toLocaleString('default', { month: 'long' })
    let year = orderDate.getFullYear().toString()
    orderDate = `${date} ${month} ${year}`
    return orderDate
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

  const getFormateedAddress = () => {
    let add = address.split('&nbsp;').join(' ').split('<br>')
    if (add.length < 2) return add
    return add.map((line) => <p>{line}</p>)
  }

  const inrCurrencyFormat = (amount) => {
    return amount.toString().replace(/(\d)(?=(\d{2})+\d\.)/g, '$1,') // to indian currency formatting - commas
  }

  const getSubTotal = (order) => {
    let total = 0

    order.products.forEach((p) => {
      total += p.product.price
    })
    return inrCurrencyFormat(total.toFixed(2))
  }

  const getCouponAmount = (order) => {
    let total = 0

    order.products.forEach((p) => {
      total += p.product.price
    })

    let grandTotal = order.paymentIntent.amount / 100

    let couponAmount = grandTotal - total

    return inrCurrencyFormat(couponAmount.toFixed(2))
  }
  const getTotal = (order) => {
    let grandTotal = inrCurrencyFormat(
      (order.paymentIntent.amount / 100).toFixed(2)
    )
    return grandTotal
  }

  const showOrderedProducts = (order) => (
    <OrderProductsContainer>
      <OrderStatus>
        {order.orderStatus === 'Delivered'
          ? `Delivered ${getOrderedTime(order)}`
          : order.orderStatus}
      </OrderStatus>
      {order &&
        order.products &&
        order.products.map((product) => (
          <ProductContainer>
            <ProductImage>
              <Img
                src={
                  product.product.images
                    ? product.product.images[0].url
                    : laptop
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

  return (
    <Container>
      <UserNav />
      <Content>
        <Heading>Order Details</Heading>
        <OrderDate>Ordered on {getOrderedTime(order)}</OrderDate>
        <OrderDetailsContainer>
          <ShippingAddress>
            <SubHeading>Shipping Address</SubHeading>
            <Address>{getFormateedAddress()}</Address>
          </ShippingAddress>
          <PaymentMethod>
            <SubHeading>Payment Method</SubHeading>
            <PaymentMethodContent>
              {!loading && order.paymentIntent.payment_method_types}
            </PaymentMethodContent>
          </PaymentMethod>
          <OrderSummary>
            <SubHeading>Order Summary</SubHeading>
            <OrderSummaryContent>
              <Payments>
                <Left>Item(s) Subtotal:</Left>
                <Right>&#8377;{!loading && getSubTotal(order)}</Right>
              </Payments>
              <Payments>
                <Left>Coupon amount: </Left>
                <Right>-&#8377;{!loading && getCouponAmount(order)}</Right>
              </Payments>
              <Payments>
                <Left>Total: </Left>
                <Right>&#8377;{!loading && getTotal(order)}</Right>
              </Payments>
              <GrandTotal>
                <Left>Grand Total: </Left>
                <Right>&#8377;{!loading && getTotal(order)}</Right>
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
  margin: 1rem 0;
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
  & > p {
    margin-bottom: 3px;
  }
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
  font-size: 20px;
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
  margin: 5px 0;
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
  margin-bottom: 1rem;
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
