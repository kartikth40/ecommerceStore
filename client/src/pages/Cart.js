import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { userCart } from '../functions/user'

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const history = useHistory()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const saveOrderToDb = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push('/checkout')
      })
      .catch((err) => console.log('cart save err', err))
  }

  const showCartItems = () => (
    <Table>
      <Thead>
        <Tr>
          <Th scope="col">Image</Th>
          <Th scope="col">Title</Th>
          <Th scope="col">Price</Th>
          <Th scope="col">Brand</Th>
          <Th scope="col">Color</Th>
          <Th scope="col">Count</Th>
          <Th scope="col">Shipping</Th>
          <Th scope="col">Remove</Th>
        </Tr>
      </Thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p}></ProductCardInCheckout>
      ))}
    </Table>
  )

  return (
    <Container>
      <CartItemsContainer>
        <Heading>Cart / {cart.length} Product</Heading>
        {!cart.length ? (
          <p>
            No products in cart. <Link to="/shop">Continue Shopping.</Link>
          </p>
        ) : (
          showCartItems()
        )}
      </CartItemsContainer>
      <OrderSummaryContainer>
        <Heading>Order Summary</Heading>
        <SubHeading>Products</SubHeading>
        {cart.map((p, i) => (
          <div key={i}>
            <Calc>
              {p.title} <Multiplier>x{p.count} </Multiplier> ={' '}
              <CurrencySymbol>&#8377; </CurrencySymbol> {p.price * p.count}
            </Calc>
          </div>
        ))}
        <Hr />
        <TotalPay>
          Total = <CurrencySymbol> &#8377; </CurrencySymbol>
          {getTotal()}
        </TotalPay>
        <Hr />
        {user ? (
          <CheckoutButton onClick={saveOrderToDb} disabled={!cart.length}>
            Proceed To Checkout
          </CheckoutButton>
        ) : (
          <CheckoutButton>
            <StyledLink
              to={{
                pathname: '/login',
                state: { from: 'cart' },
              }}
            >
              Login To Checkout
            </StyledLink>
          </CheckoutButton>
        )}
      </OrderSummaryContainer>
    </Container>
  )
}

export default Cart

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Heading = styled.h1`
  margin-bottom: 2rem;
`
const CartItemsContainer = styled.div`
  margin: 2rem;
  padding: 0 1rem;
  width: 70vw;
  min-height: calc(100vh - 4rem - 70px);
`
const OrderSummaryContainer = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;
  width: calc(30vw - 6rem);
`
const SubHeading = styled.h3``
const Calc = styled.p`
  margin: 10px 0;
`
const CheckoutButton = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
  cursor: pointer;
  transition: 0.1s all;
  &:hover:enabled {
    border-radius: 5px;
    transform: scale(1.05);
  }
  &:active:enabled {
    transform: scale(0.97);
  }

  &:disabled,
  &[disabled] {
    background-color: white;
    color: grey;
    cursor: not-allowed;
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`
const CurrencySymbol = styled.span`
  display: inline-block;
`
const Multiplier = styled.span`
  font-weight: bold;
`
const Hr = styled.hr`
  margin: 1rem 0;
`
const TotalPay = styled.div`
  font-weight: bold;
  font-size: 30px;
`
const Table = styled.table`
  min-width: max-content;
  border-collapse: collapse;
  border: 1px solid rgba(0, 0, 0, 0.3);
`
const Thead = styled.thead`
  font-size: 20px;
  background: rgba(0, 0, 0, 0.1);
`
const Tr = styled.tr``
const Th = styled.th`
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
`
