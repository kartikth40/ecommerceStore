import React from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'
import { Heading } from '../admin/AdminDashboard'

const Wishlist = () => {
  return (
    <Container>
      <UserNav />
      <Content>
        <Heading>User Wishlist Page</Heading>
      </Content>
    </Container>
  )
}

export default Wishlist

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Content = styled.div`
  text-align: left;
  font-weight: bold;
  width: 100%;
`
