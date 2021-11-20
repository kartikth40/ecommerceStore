import React from 'react'
import styled from 'styled-components'
import AdminNav from '../../components/nav/AdminNav'

const AdminDashboard = () => {
  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Admin Dashboard</Heading>
      </Content>
    </Container>
  )
}

export default AdminDashboard

const Container = styled.div`
  margin-top: 70px;
  display: flex;
  font-weight: bold;
  font-size: 3rem;
`
const Content = styled.div`
  width: calc(100vw - 300px);
  height: 100%;
  margin: 2rem;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
`
const Heading = styled.h2``

export { Container, Content, Heading }
