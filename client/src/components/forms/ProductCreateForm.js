import React from 'react'
import styled from 'styled-components'
import Select from 'react-select'
import DropDownSelector from './DropDownSelector'

const ProductCreateForm = ({
  handleChange,
  handleCategoryChange,
  handleSubmit,
  values,
  setValues,
  subOptions,
  showSub,
}) => {
  const getSubOptions = () => {
    return subOptions.map((s) => {
      return { value: `${s._id}`, label: `${s.name}` }
    })
  }
  const getAllSubs = (valObj) => valObj.map((v) => v.value)
  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label>Title :</Label>
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
        <Label>Description :</Label>
        <Input
          type="text"
          name="description"
          value={values.description}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <FormGroup>
        <Label>Price :</Label>
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
        <Label>Quantity :</Label>
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
          label="Color"
          name="color"
          onChangeHandler={handleChange}
          elements={values.colors}
        />
      </FormGroup>
      <FormGroup>
        <DropDownSelector
          label="Brand"
          name="brand"
          onChangeHandler={handleChange}
          elements={values.brands}
        />
      </FormGroup>
      <FormGroup>
        <DropDownSelector
          label="Category"
          name="category"
          onChangeHandler={handleCategoryChange}
          elements={values.categories}
          menuItem="name"
        />
      </FormGroup>
      {showSub && (
        <FormGroup>
          <Label>Sub Category: </Label>
          <StyledSelect
            isMulti
            name="subs"
            options={subOptions ? getSubOptions() : []}
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            onChange={(value) =>
              setValues({ ...values, subs: getAllSubs(value) })
            }
          />
        </FormGroup>
      )}

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
const StyledSelect = styled(Select)`
  width: 100%;
  margin: 10px 0;
  font-size: 20px;
  font-weight: bold;
  border: none;
  outline: none;
`
