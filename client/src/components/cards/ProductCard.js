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
        <DeleteBTN
          onClick={
            () => {}
            // handleRemove(slug)
          }
        >
          Delete
        </DeleteBTN>
        <EditBTN to={`/admin/product/${slug}`}>Edit</EditBTN>
      </Buttons>
    </Card>
  )
}

export default ProductCard
