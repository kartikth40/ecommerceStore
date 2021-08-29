import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    loadCategories()
  }, [categories])

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err))

  const { user } = useSelector((state) => ({ ...state }))

  const categoryForm = () => {
    const handleSubmit = (e) => {
      e.preventDefault()
      setLoading(true)

      createCategory({ name }, user.token)
        .then((res) => {
          setLoading(false)
          setName('')
          toast.success(`"${res.data.name}" is created`)
        })
        .catch((err) => {
          setLoading(false)
          console.log(err)
          if (err.response.status == 400) {
            toast.error(err.response.data)
          }
        })
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Label>Name: </Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <Button>SAVE</Button>
      </Form>
    )
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>{loading ? <>loading...</> : <>Create Category</>}</Heading>
        {categoryForm()}
        <CategoryList>
          {categories.map((c) => {
            return <CategoryListItem key={c._id}>{c.name}</CategoryListItem>
          })}
        </CategoryList>
      </Content>
    </Container>
  )
}

export default CategoryCreate

const Container = styled.div`
  display: flex;
  // height: calc(100vh - 70px);
  font-weight: bold;
  font-size: 3rem;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
`
const Heading = styled.h3``
const Form = styled.form``
const Label = styled.label`
  margin-top: 2rem;
  display: block;
  font-size: 1rem;
  font-weight: medium;
`
const Input = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const Button = styled.button`
  background-color: black;
  color: white;
  display: block;
  font-size: 30px;
  padding: 10px 20px;
  margin: 2rem 0;
  border: none;
  transition: 250ms all;
  &:hover {
    opacity: 0.85;
    border-radius: 50px;
  }
  &:focus,
  &:active {
    opacity: 0.5;
    border-radius: 50px 50px 0 50px;
  }
`
const CategoryList = styled.div`
  border: 1px solid black;
  padding: 1rem;
  text-align: left;
  font-size: 1rem;
  font-weight: light;
`
const CategoryListItem = styled.div`
  border: 1px solid black;
  padding: 1rem;
`
