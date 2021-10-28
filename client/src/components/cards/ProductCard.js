import React from 'react'
import {
  Card,
  Cover,
  Title,
  Desc,
  Buttons,
  DeleteBTN,
  EditBTN,
} from './AdminProductCard'
import laptop from '../../images/laptop.jpg'
import Skeleton from './Skeleton'

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
      <Desc>{`${description && description.substring(0, 40)}${
        description.length > 40 ? '...' : ''
      }`}</Desc>
      <Buttons>
        <AddToCartBTN onClick={() => {}}>Add To Cart</AddToCartBTN>
        <ViewProductBTN to={`/product/${slug}`}>View Product</ViewProductBTN>
      </Buttons>
    </Card>
  )
}

export default ProductCard

const ViewProductBTN = EditBTN // same layout
const AddToCartBTN = DeleteBTN // same layout
