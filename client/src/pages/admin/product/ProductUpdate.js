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
  const [categories, setCategories] = useState([])
  const [arrayOfSubs, setArrayOfSubs] = useState([])

  const { user } = useSelector((state) => ({ ...state }))
  //router
  const { slug } = useParams()

  useEffect(() => {
    loadProduct()
    loadCategories()
  }, [])

  const loadProduct = () => {
    getProduct(slug).then((product) => {
      //load single product
      setValues({ ...values, ...product.data })
      //load single product category subs
      getCategorySubs(product.data.category._id).then((res) => {
        setSubOptions(res.data) // on first load
      })
      //prepare array of sub ids to show as default of values in subs select input
      let arr = []
      product.data.subs.map((s) => {
        arr.push(s)
      })
      setArrayOfSubs((prev) => arr)
    })
  }
  const loadCategories = () => {
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleCategoryChange = (e) => {
    e.preventDefault()
    setValues({ ...values, subs: [], category: e.target.value })

    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data)
      })
      .catch((err) => {
        toast.error(err)
        console.log(err)
      })

    //if user clicks back to the original category show its sub category in default
    if (values.category._id === e.target.value) {
      loadProduct()
    } else {
      // clear subs
      setArrayOfSubs([])
    }
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Edit Form</Heading>
        <ProductUpdateForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          categories={categories}
          values={values}
          setValues={setValues}
          subOptions={subOptions}
          handleCategoryChange={handleCategoryChange}
          arrayOfSubs={arrayOfSubs}
          setArrayOfSubs={setArrayOfSubs}
        />
      </Content>
    </Container>
  )
}

export default ProductUpdate
