import React from 'react'
import styled from 'styled-components'

const DropDownSelector = ({ label, setValue, elements, menuItem }) => {
  return (
    <>
      <Label>{label} :</Label>
      <Select onChange={(e) => setValue(e.target.value)}>
        <Option>select one</Option>
        {elements.length &&
          elements.map((c) => {
            return (
              <Option key={c._id} value={c._id}>
                {menuItem ? c[menuItem] : c}
              </Option>
            )
          })}
      </Select>
    </>
  )
}

export default DropDownSelector

const Label = styled.label`
  margin-top: 2rem;
  display: block;
  font-size: 1rem;
  font-weight: medium;
`
const Select = styled.select`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const Option = styled.option``
