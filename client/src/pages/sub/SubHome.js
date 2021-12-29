import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getSub } from '../../functions/sub'
import styled from 'styled-components'
import ProductCard from '../../components/cards/ProductCard'

const SubHome = () => {
  const [sub, setSub] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    setLoading(true)
    getSub(slug).then((res) => {
      console.log(res.data)
      setSub(res.data.sub)
      setProducts(res.data.products)
      setLoading(false)
    })
  }, [])

  return (
    <Container>
      <Heading>
        {loading ? (
          'Loading...'
        ) : (
          <div>
            {products.length} {products.length > 1 ? 'Products' : 'Product'} in{' '}
            <SubName>{sub.name} </SubName>
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

export default SubHome

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  text-align: center;
  width: 85vw;
  max-width: 100vw;
  height: 100%;
  margin: 70px auto 0;
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
const SubName = styled.span`
  font-weight: bold;
`
const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
