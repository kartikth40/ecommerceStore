import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import laptop from '../../images/laptop.jpg'

const AdminProductCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product
  return (
    <Card>
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
        <DeleteBTN onClick={() => handleRemove(slug)}>Delete</DeleteBTN>
        <EditBTN to={`/admin/product/${slug}`}>Edit</EditBTN>
      </Buttons>
    </Card>
  )
}

const Card = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  margin: 50px 10px 0 10px;
  width: 300px;
  height: 350px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1rem;
`
const Cover = styled.div`
  height: 150px;
  width: 300px;
  border-radius: 10px;
  & img {
    padding: 10px;
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
  height: 20px;
  color: rgba(0, 0, 0, 0.5);
  text-align: left;
`
const Buttons = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  & button,
  & a {
    background-color: black;
    background-image: linear-gradient(10deg, #000000 0%, #434343 80%);
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 10px;
    width: 100%;
    text-align: center;
    transition: 0.05s all;
    &:hover:enabled {
      transform: scale(1.05);
    }
    &:active:enabled {
      transform: scale(1.05);
    }
  }
`
const CardButton = styled.button`
  padding: 5px;
  margin: 10px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: bold;
  cursor: pointer;
  &:hover:enabled {
    transform: scale(1.05);
  }
  &:active:enabled {
    transform: scale(1.05);
  }
`
const DeleteBTN = CardButton
const ButtonWithLink = styled(Link)`
  text-decoration: none;
  padding: 5px;
  margin: 10px;
  color: rgb(255, 255, 255);
  font-size: 10px;
  font-weight: bold;
  &:hover {
    transform: scale(1.05);
  }
  &:active {
    transform: scale(1.05);
  }
`
const EditBTN = ButtonWithLink
export default AdminProductCard
export { Card, Cover, Title, Desc, Buttons, CardButton, ButtonWithLink }
