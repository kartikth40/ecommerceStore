import React from 'react'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import device from '../../mediaQueries'

const SideFilterMenu = ({
  filterClicked,
  setFilterClicked,
  fetchProducts,
  price,
  setPrice,
  dispatch,
  setOk,
  categories,
  setCategoriesSelected,
  categoriesSelected,
  star,
  setStar,
  subs,
  sub,
  setSub,
  brands,
  brandsSelected,
  setBrandsSelected,
  colors,
  colorsSelected,
  setColorsSelected,
  shipping,
  setShipping,
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
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setCategoriesSelected([])
    setStar(0)
    setSub([])
    setBrandsSelected([])
    setColorsSelected([])
    setShipping('')
    // ------------------------ resetting

    setPrice(e.target.value)
    setOk((prev) => !prev)
  }

  const handleCategory = (e) => {
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    setStar(0)
    setSub([])
    setBrandsSelected([])
    setColorsSelected([])
    setShipping('')
    // ------------------------ resetting

    let inTheState = [...categoriesSelected]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }

    setCategoriesSelected(inTheState)
    fetchProducts({ category: inTheState })
  }

  const handleSubSelect = (s) => {
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    setCategoriesSelected([])
    setStar(0)
    setBrandsSelected([])
    setColorsSelected([])
    setShipping('')
    // ------------------------ resetting

    setSub(s)
    fetchProducts({ subs: s })
  }

  const handleStarClick = (num) => {
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    setCategoriesSelected([])
    setSub([])
    setBrandsSelected([])
    setColorsSelected([])
    setShipping('')
    // ------------------------ resetting

    setStar(num)
    fetchProducts({ stars: num })
  }

  const handleBrand = (e) => {
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    setCategoriesSelected([])
    setStar(0)
    setSub([])
    setColorsSelected([])
    setShipping('')
    // ------------------------ resetting

    let inTheState = [...brandsSelected]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }

    setBrandsSelected(inTheState)
    fetchProducts({ brand: inTheState })
  }
  const handleColor = (e) => {
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    setCategoriesSelected([])
    setStar(0)
    setSub([])
    setBrandsSelected([])
    setShipping('')
    // ------------------------ resetting

    let inTheState = [...colorsSelected]
    let justChecked = e.target.value
    let foundInTheState = inTheState.indexOf(justChecked)

    if (foundInTheState === -1) {
      inTheState.push(justChecked)
    } else {
      inTheState.splice(foundInTheState, 1)
    }

    setColorsSelected(inTheState)
    fetchProducts({ color: inTheState })
  }

  const handleShipping = (e) => {
    // ------------------------ resetting
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: '' },
    })
    setPrice(0)
    setCategoriesSelected([])
    setStar(0)
    setSub([])
    setBrandsSelected([])
    setColorsSelected([])
    // ------------------------ resetting

    let shippingValueSelected = e.target.value
    setShipping(shippingValueSelected)
    fetchProducts({ shipping: shippingValueSelected })
  }

  return (
    <Container show={filterClicked}>
      <FilterHeading>
        <span>Filters</span>{' '}
        {filterClicked && (
          <FilterDone
            onClick={() => {
              setFilterClicked(false)
              document.body.classList.remove('hide-y')
            }}
          >
            Done
          </FilterDone>
        )}
      </FilterHeading>
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
                onChange={handleCategory}
                checked={categoriesSelected.includes(c._id)}
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

      <SubsFilter>
        <StyledHeading>Subs</StyledHeading>
        <SubsList>
          {subs.map((s) => (
            <SubsSelect
              id={s._id}
              className="subs"
              key={s._id}
              onClick={() => handleSubSelect(s)}
            >
              <div>{s.name}</div>
            </SubsSelect>
          ))}
        </SubsList>
      </SubsFilter>
      <BrandFilter>
        <StyledHeading>Brand</StyledHeading>
        <BrandsList>
          {brands.map((b) => (
            <BrandSelect key={b}>
              <Checkbox
                type="checkbox"
                id={b}
                value={b}
                className="brands"
                onChange={handleBrand}
                checked={brandsSelected.includes(b)}
              />
              <Label for={b}>{b}</Label>
            </BrandSelect>
          ))}
        </BrandsList>
      </BrandFilter>
      <ColorFilter>
        <StyledHeading>Color</StyledHeading>
        <ColorsList>
          {colors.map((c) => (
            <ColorSelect key={c}>
              <Checkbox
                type="checkbox"
                id={c}
                value={c}
                className="brands"
                onChange={handleColor}
                checked={colorsSelected.includes(c)}
              />
              <Label for={c}>{c}</Label>
            </ColorSelect>
          ))}
        </ColorsList>
      </ColorFilter>
      <ShippingFilter>
        <StyledHeading>Shipping</StyledHeading>
        <ShippingOptions>
          <ShippingSelect>
            <Radio
              type="radio"
              id="shipping-yes"
              value="Yes"
              className="shipping"
              onChange={handleShipping}
              checked={shipping === 'Yes'}
            />
            <Label for="shipping-yes">Yes</Label>
          </ShippingSelect>
          <ShippingSelect>
            <Radio
              type="radio"
              id="shipping-no"
              value="No"
              className="shipping"
              onChange={handleShipping}
              checked={shipping === 'No'}
            />
            <Label for="shipping-no">No</Label>
          </ShippingSelect>
        </ShippingOptions>
      </ShippingFilter>
    </Container>
  )
}

export default SideFilterMenu

const Container = styled.div`
  width: 300px;
  height: calc(100vh - 70px);
  position: fixed;
  z-index: 10;
  overflow-y: scroll;
  padding: 1rem;
  transition: 0.5s all;

  @media screen and ${device.tablet} {
    padding-bottom: 100px;
    width: 100%;
    height: 100%;
    top: 0;
    left: ${(props) => (props.show ? '0' : '-150%')};
    background-color: white;
  }
`

const FilterHeading = styled.h2`
  font-weight: bold;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;

  & span {
    transform: translateY(5px);
  }
  @media screen and ${device.tablet} {
    font-size: 40px;
    width: 90%;
    border-radius: 20px;
    position: fixed;
    padding: 10px 20px;
    bottom: 0;
    z-index: 10;
    background-color: black;
    color: white;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  }
`
const FilterDone = styled.div`
  font-size: 25px;
  display: inline-block;
  border: 1px solid white;
  border-radius: 10px;
  padding: 7px 10px 5px 10px;
  cursor: pointer;
  &:hover,
  &:active {
    background-color: black;
    color: white;
  }
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
  padding: 10px 10px 5px;
  right: 0;
  font-size: 15px;
  font-weight: 400;
  transform: translateY(-100%);
  width: max-content;
  min-width: 50px;
  height: 20px;
  border: 1px solid rgba(0, 0, 0, 0.7);
  color: rgba(0, 0, 0, 0.7);
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
const StarsTag = styled(PriceTag)`
  padding: 5px 10px 3px;
`
const Stars = styled.span`
  margin-inline: 5px;
`
const SubsFilter = styled.div`
  margin-top: 15px;
`
const SubsList = styled.div`
  widht: 100%;
  display: flex;
  flex-wrap: wrap;
`
const SubsSelect = styled.button`
  border: 1px solid black;
  margin: 2px;
  padding: 2px 5px;
  border-radius: 20px;
  cursor: pointer;

  &:active,
  &:focus {
    background-color: black;
    color: white;
  }
`
const BrandFilter = styled.div`
  margin-top: 15px;
`
const BrandsList = styled.div``
const BrandSelect = styled.div``
const ColorFilter = styled.div`
  margin-top: 15px;
`
const ColorsList = styled.div``
const ColorSelect = styled.div``

const ShippingFilter = styled.div`margin-top 15px;
`
const ShippingOptions = styled.div``
const ShippingSelect = styled.div``
const Radio = styled.input`
  margin: 5px;
`
