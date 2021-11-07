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

const ProductCard = ({ product }) => {
  const { title, description, images, slug } = product
  return (
    <Card>
      <Cover>
        <img
          src={images && images.length ? images[0].url : laptop}
          alt="cover image"
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
