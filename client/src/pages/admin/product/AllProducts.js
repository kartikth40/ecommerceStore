import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import AdminNav from '../../../components/nav/AdminNav'
import { getProductsByCount } from '../../../functions/product'
import AdminProductCard from '../../../components/cards/AdminProductCard'
import { removeProduct } from '../../../functions/product'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const AllProducts = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }))

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

  const handleRemove = (slug) => {
    if (window.confirm('Delete ?')) {
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts()
          toast.error(`${res.data.title} is deleted`)
          console.log(res.data)
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data)
          }
          console.log(err)
        })
    }
  }
  return (
    <Container>
      <AdminNav />
      <Content>
        {loading ? <Heading>loading...</Heading> : <Heading>Products</Heading>}
        <ProductsContainer>
          {products.map((product) => (
            <AdminProductCard
              product={product}
              key={product._id}
              handleRemove={handleRemove}
            />
          ))}
        </ProductsContainer>
      </Content>
    </Container>
  )
}

export default AllProducts

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
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
export { Container, Content, Heading }
