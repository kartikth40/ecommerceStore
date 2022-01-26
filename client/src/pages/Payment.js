import React from 'react'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
  return (
    <Container>
      <Elements stripe={promise}>
        <StripeCheckout />
      </Elements>
    </Container>
  )
}

export default Payment

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
