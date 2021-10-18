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
          alt="cover image"
        />
      </Cover>
      <Title>{title}</Title>
      <Desc>{`${description && description.substring(0, 40)}${
        description.length > 40 ? '...' : ''
      }`}</Desc>
      <Buttons>
        <DeleteBTN onClick={() => handleRemove(slug)}>Delete</DeleteBTN>
        <EditBTN to={'a'}>Edit</EditBTN>
      </Buttons>
    </Card>
  )
}

const Card = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  margin-top: 50px;
  margin-right: 20px;
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`
const Cover = styled.div`
  height: 200px;
  width: 300px;
  border-radius: 10px;
  margin-bottom: 20px;
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
`
const Buttons = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const DeleteBTN = styled.button`
  padding: 5px;
  margin: 10px;
  border: none;
  color: rgb(255, 150, 150);
  background: transparent;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.15s all;
  &:hover {
    transform: scale(1.1);
  }
  &:active,
  &:focus {
    transform: scale(0.9);
  }
`
const EditBTN = styled(Link)`
  text-decoration: none;
  padding: 5px;
  margin: 10px;
  color: rgb(255, 150, 150);
  background: transparent;
  font-size: 1rem;
  font-weight: light;
  transition: 0.15s all;
  &:hover {
    transform: scale(1.1);
  }
  &:active,
  &:focus {
    transform: scale(0.9);
  }
`
export default AdminProductCard
