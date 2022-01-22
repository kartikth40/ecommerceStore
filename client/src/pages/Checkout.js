import React from 'react'
import styled from 'styled-components'

const Checkout = () => {
  const saveAddressToDb = () => {}
  return (
    <Container>
      <LeftContainer>
        <Heading>Delivery Address</Heading>
        <br />
        <br />
        textArea
        <button onClick={saveAddressToDb}>Save</button>
        <hr />
        <h4>Got Coupon ?</h4>
        <br />
        coupon input and apply button
      </LeftContainer>
      <OrderSummaryContainer>
        <Heading>Order Summary</Heading>
        <SubHeading>Products</SubHeading>
        {/* {cart.map((p, i) => (
      <div key={i}>
        <Calc>
          {p.title} <Multiplier>x{p.count} </Multiplier> ={' '}
          <CurrencySymbol>&#8377; </CurrencySymbol> {p.price * p.count}
        </Calc>
      </div>
    ))} */}
        <p>list of products</p>
        <Hr />
        <TotalPay>
          Cart Total = <CurrencySymbol> &#8377; </CurrencySymbol> xxxxx
          {/* {getTotal()} */}
        </TotalPay>
        <Hr />

        <PlaceOrderButton>Place Order</PlaceOrderButton>
      </OrderSummaryContainer>
    </Container>
  )
}

export default Checkout

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Heading = styled.h1`
  margin-bottom: 2rem;
`
const LeftContainer = styled.div`
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
const PlaceOrderButton = styled.button`
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
