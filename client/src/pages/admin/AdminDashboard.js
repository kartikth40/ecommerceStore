import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AdminNav from '../../components/nav/AdminNav'
import { getProductsByCount } from '../../functions/product'
import AdminProductCard from '../../components/cards/AdminProductCard'

const AdminDashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }
  return (
    <Container>
      <AdminNav />
      <Content>
        {loading ? (
          <Heading>loading...</Heading>
        ) : (
          <Heading>Admin Dashboard</Heading>
        )}
        <ProductsContainer>
          {products.map((product) => (
            <AdminProductCard product={product} key={product._id} />
          ))}
        </ProductsContainer>
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
const ProductsContainer = styled.div``
export { Container, Content, Heading }
