import React from 'react'
import styled from 'styled-components'
import device from '../../mediaQueries'

const SimpleInputForm = ({ label, value, setValue, handleSubmit }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Label>{label} :</Label>
      <Input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        required
      />
      <Button>SAVE</Button>
    </Form>
  )
}

export default SimpleInputForm

const Form = styled.form``
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

  @media screen and ${device.mobile} {
    font-size: 20px;
  }
`
