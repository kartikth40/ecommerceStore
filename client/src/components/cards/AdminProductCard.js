import React from 'react'
import styled from 'styled-components'

const AdminProductCard = ({ product }) => {
  const { title, description, images } = product
  return (
    <Card>
      <Cover>
        <img
          src={images && images.length ? images[0].url : ''}
          alt="cover image"
        />
      </Cover>
      <Title>{title}</Title>
      <Desc>{description}</Desc>
    </Card>
  )
}

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  margin: 50px 50px 0 0;
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Cover = styled.div`
  height: 200px;
  width: 250px;
  border: 2px solid rgba(0, 0, 0, 1);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;
  }
`
const Title = styled.div`
  margin: 10px;
`
const Desc = styled.div`
  margin: 10px;
`
export default AdminProductCard
