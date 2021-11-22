import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const ProductInfo = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product
  return (
    <Ul>
      <Li>
        <Left>Price</Left>{' '}
        <Right>
          <CurrencySymbol>&#8377; </CurrencySymbol> {price ? price : '-----'}
        </Right>
      </Li>
      <Li>
        <Left>Category</Left>{' '}
        <Right>
          {category ? (
            <StyledLink to={`category/${category.slug}`}>
              {category.name}
            </StyledLink>
          ) : (
            <div> loading... </div>
          )}
        </Right>
      </Li>
      <Li>
        <Left>Sub Categories</Left>{' '}
        <Right>
          {subs ? (
            subs.map((sub) => {
              return (
                <StyledLink key={sub._id} to={`/sub/${sub.slug}`}>
                  {sub.name}
                </StyledLink>
              )
            })
          ) : (
            <div> loading... </div>
          )}
        </Right>
      </Li>
      <Li>
        <Left>Shipping</Left>{' '}
        <Right>{shipping ? shipping : 'loading...'}</Right>
      </Li>
      <Li>
        <Left>Color</Left> <Right>{color ? color : 'loading...'}</Right>
      </Li>
      <Li>
        <Left>Brand</Left> <Right>{brand ? brand : 'loading...'}</Right>
      </Li>
      <Li>
        <Left>Available</Left>{' '}
        <Right>{quantity ? quantity : 'loading...'}</Right>
      </Li>
      <Li>
        <Left>Sold</Left> <Right>{sold ? sold : 'loading...'}</Right>
      </Li>
    </Ul>
  )
}

export default ProductInfo

const Ul = styled.ul`
  padding: 1rem;
  list-style-type: none;
`
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  margin: 10px;
`
const Left = styled.span`
  font-weight: bold;
`
const Right = styled.span`
  margin-left: 20px;
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
`
const CurrencySymbol = styled.span`
  display: inline-block;
  width: 25px;
  height: 25px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(0, 0, 0, 1);
  border-radius: 50%;
  margin-right: 10px;
`
const StyledLink = styled(Link)`
  margin: 1px;
  text-decoration: none;
  border: rgba(0, 0, 0, 1) solid 1px;
  border-radius: 25px;
  color: rgba(0, 0, 0, 1);
  padding: 5px 10px;
  transition: 0.15s all;
  font-size: 15px;

  &:hover {
    border: rgba(0, 0, 255, 1) solid 1px;
    color: rgba(0, 0, 255, 1);
  }
`
