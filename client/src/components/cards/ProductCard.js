import React from 'react'
import {
  Card,
  Cover,
  Title,
  Desc,
  Buttons,
  ButtonWithLink,
  CardButton,
} from './AdminProductCard'
import laptop from '../../images/laptop.jpg'

import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import getAverageRatings from '../../functions/getAverageRatings'

const ProductCard = ({ product }) => {
  const { _id, title, description, images, slug } = product

  const [avgRating, noOfUsers] = getAverageRatings(product)
  return (
    <Card>
      <StarRatingsContainer>
        <StarRatings
          name={_id}
          numberOfStars={5}
          rating={avgRating}
          starRatedColor="#ffca03"
          starDimension="15px"
          starSpacing="2px"
        />
        <RatingCountContainer>{`(${noOfUsers})`}</RatingCountContainer>
      </StarRatingsContainer>
      <Cover>
        <img
          src={images && images.length ? images[0].url : laptop}
          alt="cover"
        />
      </Cover>
      <Title>{title}</Title>
      <Desc>{`${description && description.substring(0, 50)}${
        description.length > 50 ? '...' : ''
      }`}</Desc>
      <Buttons>
        <ViewProductBTN to={`/product/${slug}`}>View Product</ViewProductBTN>
        <AddToCartBTN onClick={() => {}}>Add To Cart</AddToCartBTN>
      </Buttons>
    </Card>
  )
}

export default ProductCard

const ViewProductBTN = ButtonWithLink // same layout
const AddToCartBTN = CardButton // same layout
const StarRatingsContainer = styled.div`
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
`
const RatingCountContainer = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`
