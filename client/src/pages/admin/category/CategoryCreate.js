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
        <Label>Name</Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <br />
        <Button>SAVE</Button>
      </Form>
    )
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Create Category</Heading>
        {categoryForm()}
      </Content>
    </Container>
  )
}

export default CategoryCreate

const Container = styled.div`
  display: flex;
  height: calc(100vh - 70px);
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Heading = styled.h3``
const Form = styled.form``
const Label = styled.label``
const Input = styled.input``
const Button = styled.button``
