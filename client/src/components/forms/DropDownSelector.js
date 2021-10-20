import React from 'react'
import styled from 'styled-components'

const DropDownSelector = ({
  value,
  label,
  name,
  onChangeHandler,
  elements,
  menuItem,
}) => {
  return (
    <>
      <Label>{label} :</Label>
      <Select value={value} name={name} onChange={onChangeHandler}>
        <Option>Select...</Option>
        {elements.length &&
          elements.map((c) => {
            return (
              <Option key={c._id ? c._id : c} value={c._id ? c._id : c}>
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
  border-bottom: 2px solid black;
`
const Option = styled.option``
