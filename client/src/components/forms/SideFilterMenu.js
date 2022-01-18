import React, { useState } from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'

const SideFilterMenu = ({
  price,
  setPrice,
  dispatch,
  setOk,
  categories,
  setCat,
  cat,
  star,
  setStar,
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

    setCat([])

    setOk((prev) => !prev)
  }

  const handleCheck = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0) // resetting
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

  const handleStarClick = (num) => {
    setStar(num)
  }

  return (
    <Container>
      <FilterHeading>Filters</FilterHeading>
      <PriceFilter>
        <StyledHeading>
          Price
          <PriceTag>
            under
            <CurrencySymbol>&#8377; </CurrencySymbol>
            <Price className="price">{formatPrice(price)}</Price>
          </PriceTag>
        </StyledHeading>
        <Range>
          <PriceRangeInput
            type="range"
            min="0"
            max="500000"
            step="1000"
            value={price}
            onChange={(value) => handleSlider(value)}
          />
        </Range>
      </PriceFilter>
      <CategoryFilter>
        <StyledHeading>Category</StyledHeading>
        <CategoriesList>
          {categories.map((c) => (
            <CategorySelect key={c._id}>
              <Checkbox
                type="checkbox"
                id={c._id}
                value={c._id}
                className="categories"
                onChange={handleCheck}
                checked={cat.includes(c._id)}
              />
              <Label for={c._id}>{c.name}</Label>
            </CategorySelect>
          ))}
        </CategoriesList>
      </CategoryFilter>
      <StarsFilter>
        <StyledHeading>
          Ratings
          <StarsTag>
            under
            <Stars>{star}</Stars>
            stars
          </StarsTag>
        </StyledHeading>
        <StarRatings
          // name={_id}
          numberOfStars={5}
          rating={star}
          changeRating={handleStarClick}
          isSelectable={true}
          starRatedColor="red"
          starDimension="35px"
          starSpacing="2px"
        />
      </StarsFilter>
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
const StyledHeading = styled.h3`
  position: relative;
  margin-bottom: 10px;
`
const PriceFilter = styled.div``
const Range = styled.div`
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
  padding: 5px 10px;
  right: 0;
  font-size: 15px;
  font-weight: light;
  transform: translateY(-100%);
  width: max-content;
  min-width: 50px;
  height: 20px;
  border: 1px solid black;
  border-radius: 20px;
`
const CurrencySymbol = styled.span`
  margin-inline: 5px;
`
const Price = styled.span``

const CategoryFilter = styled.div`
  margin-top: 15px;
`
const CategoriesList = styled.div``
const CategorySelect = styled.div``
const Checkbox = styled.input`
  margin: 5px;
`
const Label = styled.label``

const StarsFilter = styled.div`
  margin-top: 15px;
  position: relative;
`
const StarsTag = styled(PriceTag)``
const Stars = styled.span`
  margin-inline: 5px;
`
