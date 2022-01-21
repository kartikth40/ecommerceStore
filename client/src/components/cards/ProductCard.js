import React, { useState } from 'react'
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
import { useSelector, useDispatch } from 'react-redux'

const ProductCard = ({ product }) => {
  const { _id, title, description, images, slug, price } = product

  const [tooltip, setTooltip] = useState('Click To Add')

  const [avgRating, noOfUsers] = getAverageRatings(product)

  const { user, cart } = useSelector((state) => ({ ...state }))
  const dispatch = useDispatch()

  const handleAddToCart = () => {
    // create cart array
    let cart = []
    if (window) {
      // check if cart is already in localStorage
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product
      cart.push({
        ...product,
        count: 1,
      })
      // remove duplicates
      cart = cart.filter(
        (product, index, array) =>
          array.findIndex((p) => p._id == product._id) == index
      )
      localStorage.setItem('cart', JSON.stringify(cart))
      // show Tooltip
      setTooltip('Added To Cart')

      //add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

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

        <AddToCartBTN tooltip={tooltip} onClick={handleAddToCart}>
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
  --c: '${(props) => props.tooltip}';
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: '';

  &:before,
  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    border-radius: 5px;
    opacity: 0;
    transition: 0.3s all;
  }
  &:hover:before,
  &:hover:after {
    opacity: 1;
  }

  &:hover:before {
    transform: translateY(-20px) scale(1);
  }
  &:hover:after {
    transform: translate(-50%, -15px) rotate(45deg) scale(1);
  }

  &:before {
    content: var(--c);
    bottom: 100%;
    transform: translateY(20px) scale(0);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  &:after {
    content: '';
    width: 0;
    height: 0;
    bottom: 100%;
    left: 50%;
    transform: translate(-50%, 10px) rotate(45deg) scale(0);
    border-radius: 0;

    border-bottom: 6px solid black;
    border-right: 6px solid black;
    border-left: 6px solid transparent;
    border-top: 6px solid transparent;
  }
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
export { AddToCartBTN }
