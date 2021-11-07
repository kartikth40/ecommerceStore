import React from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Buttons, CardButton, ButtonWithLink } from './AdminProductCard'
import laptop from '../../images/laptop.jpg'

const SingleProduct = ({ product }) => {
  const { title, description, images, slug } = product

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
          <ProductTitle>{product.title}</ProductTitle>
          <ProductInfo>Info</ProductInfo>
          <InfoButtons>
            <WishListBTN to={`/product/${slug}`}>Add To Wishlist</WishListBTN>
            <AddToCartBTN onClick={() => {}}>Add To Cart</AddToCartBTN>
          </InfoButtons>
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
  height: 100%;
  margin: 1rem;
`
const ProductTitle = styled.div`
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
`
const ProductInfo = styled.div`
  height: 80%;
`
const InfoButtons = styled(Buttons)`
  height: max-content;
`
const WishListBTN = ButtonWithLink
const AddToCartBTN = CardButton
