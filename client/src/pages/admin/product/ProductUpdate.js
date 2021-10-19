import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'
import ProductCreateForm from '../../../components/forms/ProductCreateForm'
import { Container, Content, Heading } from '../AdminDashboard'
import { getCategories, getCategorySubs } from '../../../functions/category'
import FileUpload from '../../../components/forms/FileUpload'

const ProductUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }))

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Edit Form</Heading>
      </Content>
    </Container>
  )
}

export default ProductUpdate
