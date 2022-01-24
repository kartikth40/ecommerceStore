import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout'
import { userCart } from '../functions/user'

const Cart = () => {
  const [loading, setLoading] = useState(false)

  const { cart, user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()
  const history = useHistory()

  const getTotal = () => {
    return cart.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const saveOrderToDb = () => {
    setLoading(true)
    userCart(cart, user.token)
      .then((res) => {
        setLoading(false)
        if (res.data.ok) history.push('/checkout')
      })
      .catch((err) => {
        setLoading(false)
        console.log('cart save err', err)
      })
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
        <hr />
        {cart.map((p, i) => (
          <div key={i}>
            <Calc>
              <Left>
                {p.title} <Multiplier>x{p.count} </Multiplier>
              </Left>
              <Right>
                <div>
                  <CurrencySymbol>&#8377; </CurrencySymbol> {p.price * p.count}
                </div>
              </Right>
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
            {loading ? 'please wait...' : 'Proceed To Checkout'}
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
  margin-bottom: 1rem;
`
const CartItemsContainer = styled.div`
  margin: 2rem;
  padding: 0 1rem;
  width: 60vw;
  min-height: calc(100vh - 4rem - 70px);
`
const OrderSummaryContainer = styled.div`
  margin: 2rem 0;
  padding: 0 1rem;
  width: calc(40vw - 6rem);
`
const SubHeading = styled.h2`
  margin-bottom: 1rem;
`
const Calc = styled.p`
  font-size: 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  justify-content: space-between;
  font-size: 20px;
  margin: 10px;
`
const Left = styled.span`
  font-weight: bold;
`
const Right = styled.span``

const CheckoutButton = styled.button`
  width: 180px;
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
  font-size: 15px;
  padding: 3px;
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
