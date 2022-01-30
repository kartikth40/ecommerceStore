import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProduct } from '../functions/product'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux'
import SingleProduct from '../components/cards/SingleProduct'
import { productStar } from '../functions/product'
import { getRelated } from '../functions/product'
import ProductCard from '../components/cards/ProductCard'
import { getRefreshedIdToken } from '../functions/getRefreshedIdToken'

const Product = () => {
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState({})
  const [star, setStar] = useState(0)
  const { slug } = useParams()
  const [related, setRelated] = useState({})

  //redux
  const { user } = useSelector((user) => ({ ...user }))

  useEffect(() => {
    const loadSingleProduct = () => {
      getProduct(slug).then((res) => {
        setProduct(res.data)
        //load related
        getRelated(res.data._id).then((res) => setRelated(res.data))
      })
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

  const onStarClick = async (newRating, name) => {
    setStar(newRating)
    let token = await getRefreshedIdToken()
    productStar(name, newRating, token).then((res) => {
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
      <RelatedProductsContainer>
        <RPTitle>Related Products</RPTitle>
        <RelatedProducts>
          {related.length ? (
            related.map((product) => (
              <ProductCard
                product={product}
                key={product._id}
                loading={loading}
              />
            ))
          ) : (
            <NoProdFound>No related products found!</NoProdFound>
          )}
        </RelatedProducts>
      </RelatedProductsContainer>
    </Container>
  )
}

export default Product

const Container = styled.div`
  margin-top: 70px;
`
const NoProdFound = styled.div`
  margin: 40px 0;
  font-size: 20px;
  color: rgba(0, 0, 0, 0.5);
  width: 100%;
  text-align: center;
`
const ProductDesc = styled.div`
  width: 100%;
  padding: 3rem;
`
const RelatedProductsContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  width: 85vw;
  max-width: 100vw;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
`
const RelatedProducts = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
const RPTitle = styled.h1`
  text-decoration: underline;
  text-align: center;
`
