import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getProduct } from '../../../functions/product'
import { Container, Content, Heading } from '../AdminDashboard'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import ProductUpdateForm from '../../../components/forms/ProductUpdateForm'

const ProductUpdate = () => {
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
  const { user } = useSelector((state) => ({ ...state }))
  //router
  const { slug } = useParams()

  useEffect(() => {
    loadProduct()
  }, [])

  const loadProduct = () => {
    getProduct(slug).then((product) => {
      setValues({ ...values, ...product.data })
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Edit Form</Heading>
        <ProductUpdateForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          values={values}
          setValues={setValues}
          // subOptions={subOptions}
          // showSub={showSub}
          // handleCategoryChange={handleCategoryChange}
        />
      </Content>
    </Container>
  )
}

export default ProductUpdate
