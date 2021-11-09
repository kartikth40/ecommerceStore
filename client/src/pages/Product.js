import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProduct } from '../functions/product'
import { useParams } from 'react-router'
import SingleProduct from '../components/cards/SingleProduct'

const Product = () => {
  const [product, setProduct] = useState({})
  const { slug } = useParams()

  useEffect(() => {
    loadSingleProduct()
  }, [slug])

  const loadSingleProduct = () => {
    getProduct(slug).then((res) => setProduct(res.data))
  }
  console.log(product)
  return (
    <Container>
      <ProductDesc>
        <SingleProduct product={product} />
      </ProductDesc>
      <RelatedProducts>
        <RPTitle>Related Products</RPTitle>
      </RelatedProducts>
    </Container>
  )
}

export default Product

const Container = styled.div`
  margin-top: 70px;
`
const ProductDesc = styled.div`
  width: 100%;
  padding: 3rem;
`
const RelatedProducts = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  width: 85vw;
  max-width: 100vw;
  min-height: 100vh;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
`
const RPTitle = styled.h1`
  text-decoration: underline;
  text-align: center;
`
