import React from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'

const Password = () => {
  return (
    <Container>
      <UserNav />
      <Content>User Password update Page</Content>
    </Container>
  )
}

export default Password

const Container = styled.div`
  display: flex;
`
const Content = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`
