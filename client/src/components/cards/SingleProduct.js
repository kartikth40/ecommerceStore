import React from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Buttons, ButtonWithLink, CardButton } from './AdminProductCard'
import laptop from '../../images/laptop.jpg'
import ProductInfo from './ProductInfo'
import StarRatings from 'react-star-ratings'

import RatingButton from '../buttons/RatingButton'

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product

  return (
    <Container>
      <TopSection>
        <CarouselContainer>
          <CustomCarousel showArrows={true} autoPlay infiniteLoop>
            {images && images.length ? (
              images &&
              images.map((i) => (
                <img src={i.url} alt="carousel" key={i.public_id} />
              ))
            ) : (
              <img src={laptop} alt="default carousel" />
            )}
          </CustomCarousel>
        </CarouselContainer>
        <ProductInfoContainer>
          <ProductTitle>{title}</ProductTitle>
          <StarRatingsContainer>
            <StarRatings
              name={_id}
              numberOfStars={5}
              rating={star}
              starRatedColor="red"
            />
          </StarRatingsContainer>
          <ProductInfo product={product} />
          <InfoButtons>
            <WishListBTN to={`/product`}>Add To Wishlist</WishListBTN>
            <AddToCartBTN onClick={() => {}}>Add To Cart</AddToCartBTN>
            <RatingButton _id={_id} onStarClick={onStarClick} star={star} />
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
  align-items: flex-start;
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
const StarRatingsContainer = styled.div`
  text-align: center;
`
const Description = styled.div`
  width: 100%;
  padding: 30px 10px;
  text-align: center;
`
