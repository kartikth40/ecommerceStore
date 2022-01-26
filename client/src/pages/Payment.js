import React from 'react'
import styled from 'styled-components'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import StripeCheckout from '../components/StripeCheckout'
import '../stripe.css'

// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY)

const Payment = () => {
  return (
    <Container>
      <Heading>Complete your purchase</Heading>
      <Elements stripe={promise}>
        <StripeCheckout />
      </Elements>
    </Container>
  )
}

export default Payment

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Heading = styled.h1`
  margin-bottom: 1rem;
`
