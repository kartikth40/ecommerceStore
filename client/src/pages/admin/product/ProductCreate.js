import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { Container, Content, Heading } from '../AdminDashboard'
import { getCategories, getCategorySubs } from '../../../functions/category'

const ProductCreate = () => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories()
      .then((c) => setValues({ ...values, categories: c.data }))
      .catch((err) => console.log(err))

  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    categories: [],
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

  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)

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

  const handleCategoryChange = (e) => {
    e.preventDefault()
    setValues({ ...values, subs: [], category: e.target.value }) //fix this afterwards

    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data)
      })
      .catch((err) => {
        toast.error(err)
        console.log(err)
      })
    setShowSub(true)
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Create Form</Heading>
        <ProductCreateForm
          handleChange={handleChange}
          handleCategoryChange={handleCategoryChange}
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
          subOptions={subOptions}
          showSub={showSub}
        />
      </Content>
    </Container>
  )
}

export default ProductCreate
