import React from 'react'
import styled from 'styled-components'

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product

  return (
    <Container>
      <TopSection>
        <CarouselContainer>image carousel</CarouselContainer>
        <ProductInfoContainer>
          <ProductTitle>{product.title}</ProductTitle>
          <ProductInfo>Info</ProductInfo>
        </ProductInfoContainer>
      </TopSection>
    </Container>
  )
}

export default SingleProduct

const Container = styled.div``
const TopSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;
  min-height: 70vh;
`
const CarouselContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 60%;
  height: 100%;
  display: flex;
  margin: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ProductInfoContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  width: 40%;
  height: 100%;
  display: flex;
  margin: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const ProductTitle = styled.div``
const ProductInfo = styled.div``
