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
import { AiOutlineEye } from 'react-icons/ai'
import { FaShoppingBag } from 'react-icons/fa'

import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import getAverageRatings from '../../functions/getAverageRatings'

const ProductCard = ({ product }) => {
  const { _id, title, description, images, slug, price } = product

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
      <Price>
        <CurrencySymbol>&#8377; </CurrencySymbol> {price ? price : '-'}
      </Price>
      <Desc>{`${description && description.substring(0, 50)}${
        description.length > 50 ? '...' : ''
      }`}</Desc>
      <Buttons>
        <ViewProductBTN to={`/product/${slug}`}>
          <ViewIcon /> View Product
        </ViewProductBTN>
        <AddToCartBTN onClick={() => {}}>
          <CartIcon /> Add To Cart
        </AddToCartBTN>
      </Buttons>
    </Card>
  )
}

export default ProductCard

const ViewProductBTN = styled(ButtonWithLink)`
  display: flex;
  align-items: center;
  justify-content: center;
` // same layout
const AddToCartBTN = styled(CardButton)`
  display: flex;
  align-items: center;
  justify-content: center;
` // same layout
const StarRatingsContainer = styled.div`
  margin: 10px auto 0;
  display: flex;
  justify-content: center;
`
const RatingCountContainer = styled.div`
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`
const Price = styled.div``
const CurrencySymbol = styled.span`
  display: inline-block;
  text-align: center;
  margin-left: 10px;
`
const CartIcon = styled(FaShoppingBag)`
  margin-right: 7px;
  font-size: 13px;
`
const ViewIcon = styled(AiOutlineEye)`
  margin-right: 7px;
  font-size: 15px;
`
