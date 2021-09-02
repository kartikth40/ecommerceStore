import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { createProduct } from '../../../functions/product'

import { Container, Content } from '../AdminDashboard'
import DropDownSelector from '../../../components/forms/DropDownSelector'

const ProductCreate = () => {
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
  }

  const handleChange = (e) => {}

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>Product Create Form</Heading>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>title :</Label>
            <Input
              type="text"
              value={values.title}
              onChange={handleChange}
              autoFocus
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>description :</Label>
            <Input
              type="text"
              value={values.description}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>price :</Label>
            <Input
              type="number"
              value={values.price}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <DropDownSelector
              label="Select a Shipment type"
              setValue={handleChange}
              elements={['No', 'Yes']}
            />
          </FormGroup>
          <FormGroup>
            <Label>quantity :</Label>
            <Input
              type="number"
              value={values.quantity}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <DropDownSelector
              label="color"
              setValue={handleChange}
              elements={values.colors}
            />
          </FormGroup>
          <FormGroup>
            <DropDownSelector
              label="brand"
              setValue={handleChange}
              elements={values.brands}
            />
          </FormGroup>

          <Button>SAVE</Button>
        </Form>
      </Content>
    </Container>
  )
}

export default ProductCreate

const Heading = styled.h4``
const Form = styled.form``
const FormGroup = styled.div``
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
  background-image: linear-gradient(10deg, #000000 0%, #434343 74%);
  color: white;
  display: block;
  font-size: 30px;
  padding: 10px 20px;
  margin: 2rem 0;
  border: none;
  border-radius: 10px;
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
