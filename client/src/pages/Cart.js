import React from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Cart = () => {
  const { cart, user } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  return (
    <Container>
      <Heading>Cart</Heading>
      {JSON.stringify(cart)}
    </Container>
  )
}

export default Cart

const Container = styled.div`
  margin-top: 70px;
`
const Heading = styled.h2``
