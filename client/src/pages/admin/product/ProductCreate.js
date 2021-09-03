import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { Container, Content, Heading } from '../AdminDashboard'

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()

  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    subs: [],
    shipping: '',
    quantity: '',
    images: [],
    colors: ['Black', 'Brown', 'Silver', 'White', 'Blue'],
    brands: ['Apple', 'Microsoft', 'Samsung', 'Lenovo', 'Asus'],
    color: '',
    brand: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    createProduct(values, user.token)
      .then((res) => {
        toast.success(`"${res.data.title}" is created`)
        history.push('/admin/dashboard')
      })
      .catch((err) => {
        console.log(err)
        toast.error(err.response.data.err)
      })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Create Form</Heading>
        <ProductCreateForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
        />
      </Content>
    </Container>
  )
}

export default ProductCreate
