import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProduct } from '../functions/product'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import SingleProduct from '../components/cards/SingleProduct'
import { productStar } from '../functions/product'

const Product = () => {
  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const { slug } = useParams()

  //redux
  const { user } = useSelector((user) => ({ ...user }))

  useEffect(() => {
    const loadSingleProduct = () => {
      getProduct(slug).then((res) => setProduct(res.data))
    }
    loadSingleProduct()
  }, [slug])

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user.id.toString()
      )
      existingRatingObject && setStar(existingRatingObject.star)
    }
  }, [product, user])

  const onStarClick = (newRating, name) => {
    setStar(newRating)
    productStar(name, newRating, user.token).then((res) => {
      console.log('rating clicked', res.data)
      // loadSingleProduct()
    })
  }
  return (
    <Container>
      <ProductDesc>
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
