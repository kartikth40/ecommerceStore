import React from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Buttons, CardButton, ButtonWithLink } from './AdminProductCard'
import laptop from '../../images/laptop.jpg'
import ProductInfo from './ProductInfo'

const SingleProduct = ({ product }) => {
  const { title, images, description } = product

  return (
    <Container>
      <TopSection>
        <CarouselContainer>
          <CustomCarousel showArrows={true} autoPlay infiniteLoop>
            {images && images.length ? (
              images && images.map((i) => <img src={i.url} key={i.public_id} />)
            ) : (
              <img src={laptop} />
            )}
          </CustomCarousel>
        </CarouselContainer>
        <ProductInfoContainer>
          <ProductTitle>{title}</ProductTitle>
          <ProductInfo product={product} />
          <InfoButtons>
            <WishListBTN to={`/product`}>Add To Wishlist</WishListBTN>
            <AddToCartBTN onClick={() => {}}>Add To Cart</AddToCartBTN>
          </InfoButtons>
          <Description>{description && description}</Description>
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
  min-height: 80vh;
`
const CarouselContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 60%;
  height: 100%;
  display: flex;
  margin: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`
const CustomCarousel = styled(Carousel)``
const ProductInfoContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  width: 40%;
  margin: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
`
const ProductTitle = styled.div`
  font-size: 40px;
  background-color: rgba(0, 0, 0, 1);
  color: rgba(255, 255, 255, 1);
  font-weight: bold;
  text-align: center;
`
const InfoButtons = styled(Buttons)`
  height: max-content;
`
const WishListBTN = ButtonWithLink
const AddToCartBTN = CardButton

const Description = styled.div`
  width: 100%;
  padding: 30px 10px;
  text-align: center;
`
