import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProductsByCount } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import Jumbotron from '../components/cards/Jumbotron'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(3).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  return (
    <Container>
      <JumboHeading>
        {loading ? (
          <>Loading...</>
        ) : (
          <Jumbotron
            textArray={['Latest Products', 'New Arrivals', 'Best Sellers']}
          />
        )}
      </JumboHeading>
      <Content>
        <ProductsContainer>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              // handleRemove={handleRemove}
            />
          ))}
        </ProductsContainer>
      </Content>
    </Container>
  )
}

export default Home

const Container = styled.div`
  margin-top: 70px;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`
const JumboHeading = styled.div`
  width: 100%;
  font-size: 5rem;
  margin-bottom: 2rem;
`
const Content = styled.div`
  width: 70vw;
  max-width: 100vw;
  height: 100%;
  margin: 2rem auto;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
`
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
