import React from 'react'
import styled from 'styled-components'
import AdminNav from '../../components/nav/AdminNav'

const AdminDashboard = () => {
  return (
    <Container>
      <AdminNav />
      <Content>Admin Dashboard</Content>
    </Container>
  )
}

export default AdminDashboard

const Container = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 3rem;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
`
export { Container, Content }
