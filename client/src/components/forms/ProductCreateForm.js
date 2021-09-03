import React from 'react'
import styled from 'styled-components'

import DropDownSelector from './DropDownSelector'

const ProductCreateForm = ({ handleChange, handleSubmit, values }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>title :</Label>
        <Input
          type="text"
          name="title"
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
          name="description"
          value={values.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>price :</Label>
        <Input
          type="number"
          name="price"
          value={values.price}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <DropDownSelector
          label="Select a Shipment type"
          name="shipping"
          onChangeHandler={handleChange}
          elements={['No', 'Yes']}
        />
      </FormGroup>
      <FormGroup>
        <Label>quantity :</Label>
        <Input
          type="number"
          name="quantity"
          value={values.quantity}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <DropDownSelector
          label="color"
          name="color"
          onChangeHandler={handleChange}
          elements={values.colors}
        />
      </FormGroup>
      <FormGroup>
        <DropDownSelector
          label="brand"
          name="brand"
          onChangeHandler={handleChange}
          elements={values.brands}
        />
      </FormGroup>
      <FormGroup>
        <DropDownSelector
          label="category"
          name="category"
          onChangeHandler={handleChange}
          elements={values.categories}
          menuItem="name"
        />
      </FormGroup>

      <Button>SAVE</Button>
    </Form>
  )
}

export default ProductCreateForm

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
  border-bottom: 2px solid black;
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
