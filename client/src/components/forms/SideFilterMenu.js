import React, { useState } from 'react'
import styled from 'styled-components'

const SideFilterMenu = ({
  price,
  setPrice,
  dispatch,
  setOk,
  categories,
  setCat,
  cat,
}) => {
  const formatPrice = (price) => {
    if (price < 100000) {
      price = price / 1000 + ' K'
    } else {
      price = price / 100000 + ' L'
    }

    return price
  }

  const handleSlider = (e) => {
    setPrice(e.target.value)
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setOk((prev) => !prev)
  }

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    let inTheState = [...cat]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }

    setCat(inTheState)
  }

  return (
    <Container>
      <FilterHeading>Filters</FilterHeading>
      <PriceFilter>
        <StyledHeading>Price</StyledHeading>
        <Range>
          <PriceRangeInput
            type="range"
            min="0"
            max="500000"
            step="1000"
            value={price}
            onChange={(value) => handleSlider(value)}
          />
          <PriceTag>
            under
            <CurrencySymbol>&#8377; </CurrencySymbol>
            <Price className="price">{formatPrice(price)}</Price>
          </PriceTag>
        </Range>
      </PriceFilter>
      <CategoryFilter>
        <StyledHeading>Category</StyledHeading>
        <CategoriesList>
          {categories.map((cat) => (
            <CategorySelect key={cat._id}>
              <Checkbox
                type="checkbox"
                id={cat._id}
                value={cat._id}
                className="categories"
                onChange={handleCheck}
              />
              <Label for={cat._id}>{cat.name}</Label>
            </CategorySelect>
          ))}
        </CategoriesList>
      </CategoryFilter>
    </Container>
  )
}

export default SideFilterMenu

const Container = styled.div`
  width: 300px;
  position: relative;
  border: black solid 2px;
  padding: 1rem;
`

const FilterHeading = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
`
const StyledHeading = styled.h3``
const PriceFilter = styled.div``
const Range = styled.div`
  position: relative;
  width: 200px;
`
const PriceRangeInput = styled.input`
  width: 100%;
`
const PriceTag = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  padding: 5px;
  left: 50%;
  font-weight: bold;
  transform: translate(-50%, 10px);
  width: max-content;
  min-width: 50px;
  height: 30px;
  border: 1px solid black;
`
const CurrencySymbol = styled.span`
  margin-inline: 5px;
`
const Price = styled.span``

const CategoryFilter = styled.div`
  margin-top: 50px;
`
const CategoriesList = styled.div``
const CategorySelect = styled.div``
const Checkbox = styled.input`
  margin: 5px;
`
const Label = styled.label``
