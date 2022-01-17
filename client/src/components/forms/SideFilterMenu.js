import React from 'react'
import styled from 'styled-components'

const SideFilterMenu = ({ setLessThanPrice }) => {
  const setPriceTag = (e) => {
    let price = e.target.value
    setLessThanPrice(price)
    if (price < 100000) {
      price = price / 1000 + ' K'
    } else {
      price = price / 100000 + ' L'
    }
    document.querySelector('.price').innerText = price
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
            onChange={(value) => setPriceTag(value)}
          />
          <PriceTag>
            under
            <CurrencySymbol>&#8377; </CurrencySymbol>
            <Price className="price">0</Price>
          </PriceTag>
        </Range>
      </PriceFilter>
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
