import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getCategories } from '../../functions/category'

const CategoryList = () => {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCategories().then((cat) => {
      setCategories(cat.data)
      setLoading(false)
    })
  }, [])

  const showCategories = () =>
    categories.map((cat) => (
      <CategoryButton key={cat._id} to={`/category/${cat.slug}`}>
        {cat.name}
      </CategoryButton>
    ))

  return (
    <Container>
      {loading ? <LoadingText>loading...</LoadingText> : showCategories()}
    </Container>
  )
}

export default CategoryList

const Container = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`
const LoadingText = styled.div``
const CategoryButton = styled(Link)`
  text-decoration: none;
  font-weight: bold;
  font-size: 50px;
  width: max-content;
  background-color: white;
  color: black;
  padding: 50px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
  }
`
