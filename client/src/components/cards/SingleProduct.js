import React, { useState } from 'react'
import styled from 'styled-components'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import { Buttons, CardButton } from './AdminProductCard'
import laptop from '../../images/laptop.jpg'
import ProductInfo from './ProductInfo'
import { toast } from 'react-toastify'
import StarRatings from 'react-star-ratings'
import { addToWishlist } from '../../functions/user'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'

import { FaShoppingCart, FaClipboardCheck } from 'react-icons/fa'

import RatingButton from '../buttons/RatingButton'
import getAverageRatings from '../../functions/getAverageRatings'
import { AddToCartBTN } from './ProductCard'
import { useDispatch } from 'react-redux'

const SingleProduct = ({ product, onStarClick, star }) => {
  const { title, images, description, _id } = product

  const [tooltip, setTooltip] = useState('Click To Add')

  const [avgRating, noOfUsers] = getAverageRatings(product)

  const dispatch = useDispatch()

  const handleAddToWishlist = async () => {
    let token = await getRefreshedIdToken()

    addToWishlist(_id, token)
      .then((res) => {
        toast.success('Item added to your wishlist')
      })
      .catch((err) => {
        toast.error('Not able to add this item to your wishlist')
        console.log('ERROR ADDING TO WISHLIST -->', err)
      })
  }

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
          array.findIndex((p) => p._id === product._id) === index
      )
      localStorage.setItem('cart', JSON.stringify(cart))
      // show Tooltip
      setTooltip('Added To Cart')

      //add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
      //show cart items inside drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })
    }
  }

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
          <ProductTitle>{title ? title : 'Loading...'}</ProductTitle>
          <StarRatingsContainer>
            <StarRatings
              name={_id}
              numberOfStars={5}
              rating={avgRating}
              starRatedColor="#ffca03"
              starDimension="20px"
              starSpacing="2px"
            />
            <RatingCountContainer>{`(${noOfUsers})`}</RatingCountContainer>
          </StarRatingsContainer>
          <ProductInfo product={product} />
          <InfoButtons>
            <WishListBTN onClick={handleAddToWishlist}>
              <WishListIcon /> Add To Wishlist
            </WishListBTN>
            <AddToCartBTN tooltip={tooltip} onClick={handleAddToCart}>
              <CartIcon /> Add To Cart
            </AddToCartBTN>
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
  padding: 10px 0;
  text-align: center;
`
const InfoButtons = styled(Buttons)`
  height: max-content;
`
const WishListBTN = styled(CardButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  & > span {
    transform: translateY(2px);
  }
`

const StarRatingsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`
const RatingCountContainer = styled.div`
  font-size: 12px;
`
const Description = styled.div`
  width: 100%;
  padding: 30px 10px;
  text-align: left;
  word-wrap: break-word;
`
const WishListIcon = styled(FaClipboardCheck)`
  font-size: 15px;
  margin-right: 5px;
`
const CartIcon = styled(FaShoppingCart)`
  font-size: 15px;
  margin-right: 5px;
`
