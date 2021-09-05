import React from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'

const History = () => {
  return (
    <Container>
      <UserNav />
      <Content>User History Page</Content>
    </Container>
  )
}

export default History

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Content = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`
