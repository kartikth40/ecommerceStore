import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getOrders, changeStatus } from '../../functions/admin'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNav from '../../components/nav/AdminNav'
import Orders from '../../components/order/Orders'

const AdminDashboard = () => {
  const [token, setToken] = useState('')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(async () => {
    setToken(await getRefreshedIdToken())
    loadOrders()
  }, [token])

  const loadOrders = () => {
    if (!token) return
    getOrders(token)
      .then((res) => {
        setLoading(false)
        setOrders(res.data)
      })
      .catch((err) => {
        console.log('Error getting all the orders -> ', err)
        setLoading(false)
      })
  }

  const handleStatusChange = (orderId, orderStatus) => {
    console.log(orderId, orderStatus)
    changeStatus(orderId, orderStatus, token)
      .then((res) => {
        toast.success('Status updated')
        loadOrders()
      })
      .catch((err) => {
        console.log('Error in changing user order status', err)
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
`
const Heading = styled.h4`
  margin: 1rem 0;
  font-size: 3rem;
`

export { Container, Content, Heading }
