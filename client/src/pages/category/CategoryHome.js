import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../functions/category'
import styled from 'styled-components'
import ProductCard from '../../components/cards/ProductCard'

const CategoryHome = () => {
  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    setLoading(true)
    getCategory(slug).then((res) => {
      setCategory(res.data.category)
      setProducts(res.data.products)
      setLoading(false)
    })
  }, [slug])

  return (
    <Container>
      <Heading>
        {loading ? (
          'Loading...'
        ) : (
          <div>
            {products.length} {products.length > 1 ? 'Products' : 'Product'} in{' '}
            <CategoryName>{category.name} </CategoryName>
          </div>
        )}
      </Heading>
      <ProductsContainer>
        {!loading &&
          products.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              loading={loading}
            />
          ))}
      </ProductsContainer>
    </Container>
  )
}

export default CategoryHome

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  text-align: center;
  width: 85vw;
  max-width: 100vw;
  height: 100%;
  margin: 100px auto 0;
  padding: 2rem;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
`
const Heading = styled.div`
  width: 100%;
  height: 100%;
  font-size: 2rem;
  color: rgba(0, 0, 0);
`
const CategoryName = styled.span`
  font-weight: bold;
`
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
