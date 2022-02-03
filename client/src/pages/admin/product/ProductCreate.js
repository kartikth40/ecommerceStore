import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { Container, Content, Heading } from '../AdminDashboard'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'
import { getRefreshedIdToken } from '../../../functions/getRefreshedIdToken'

const ProductCreate = () => {
  const history = useHistory()

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
    brands: ['Apple', 'Microsoft', 'Samsung', 'Lenovo', 'Asus', 'Dell', 'HP'],
    color: '',
    brand: '',
  })
  useEffect(() => {
    const loadCategories = () =>
      getCategories()
        .then((c) => setValues((values) => ({ ...values, categories: c.data })))
        .catch((err) =>
          console.log('ERROR LOADING ALL THE CATEGORIES --> ', err)
        )
    loadCategories()
  }, [])

  const [subOptions, setSubOptions] = useState([])
  const [showSub, setShowSub] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let token = await getRefreshedIdToken()
    createProduct(values, token)
      .then((res) => {
        setLoading(false)
        toast.success(`"${res.data.title}" is created`)
        history.push('/admin/dashboard')
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERROR CREATING A NEW PRODUCT --> ', err)
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
        console.log('ERROR LOADING ALL THE CATEGORY SUBS --> ', err)
      })
    setShowSub(true)
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Create Form</Heading>
        <div>
          <FileUpload
            values={values}
            setValues={setValues}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        <ProductCreateForm
          loading={loading}
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
