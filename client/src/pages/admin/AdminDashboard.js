import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { getOrders, changeStatus } from '../../functions/admin'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'
import { toast } from 'react-toastify'
import AdminNav from '../../components/nav/AdminNav'
import Orders from '../../components/order/Orders'
import device from '../../mediaQueries'

const AdminDashboard = () => {
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrders = useCallback(() => {
    if (!token) return
    getOrders(token)
      .then((res) => {
        setLoading(false)
        setOrders(res.data)
      })
      .catch((err) => {
        console.log('ERROR GETTING ALL THE USER ORDERS -> ', err)
        setLoading(false)
      })
  }, [token])

  useEffect(() => {
    const load = async () => {
      setToken(await getRefreshedIdToken())
      loadOrders()
    }
    load()
  }, [token, loadOrders])

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, token)
      .then((res) => {
        toast.success('Status updated')
        loadOrders()
      })
      .catch((err) => {
        console.log('ERROR CHANGING USER ORDER STATUS -->', err)
        toast.error('Something went wrong, order status change failed!')
      })
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Admin Dashboard</Heading>
        {loading ? (
          'Loading...'
        ) : (
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        )}
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

  @media screen and ${device.tablet} {
    width: 100vw;
    margin: 0;
    padding: 1rem;
  }
`
const Heading = styled.h4`
  margin: 1rem 0;
  font-size: 3rem;
  @media screen and ${device.tablet} {
    font-size: 2rem;
  }
`

export { Container, Content, Heading }
