import React from 'react'
import styled from 'styled-components'
import laptop from '../../images/laptop.jpg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const ProductCardInCheckout = ({ p }) => {
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']

  const dispatch = useDispatch()

  const handleColorChange = (e) => {
    let cart = []
    if (window) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, index) => {
        if (product._id === p._id) {
          cart[index].color = e.target.value
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }
  return (
    <Tbody>
      <Tr>
        <Td>
          <StyledLink to={`/product/${p.slug}`}>
            {p.images.length ? (
              <Image src={p.images[0].url} alt="product" />
            ) : (
              <Image src={laptop} alt="product" />
            )}
          </StyledLink>
        </Td>
        <Td>
          <StyledLink to={`/product/${p.slug}`}>{p.title}</StyledLink>
        </Td>
        <Td>{p.price}</Td>
        <Td>{p.brand}</Td>
        <Td>
          {
            <Select onChange={handleColorChange} name="color">
              {p.color ? <Option>{p.color}</Option> : <Option>Select</Option>}
              {colors
                .filter((c) => c !== p.color)
                .map((c) => (
                  <Option key={c} value={c}>
                    {c}
                  </Option>
                ))}
            </Select>
          }
        </Td>
        <Td>{p.count}</Td>
        <Td>Shipping Icon</Td>
        <Td>Remove Icon</Td>
      </Tr>
    </Tbody>
  )
}

export default ProductCardInCheckout

const Tbody = styled.tbody``
const Tr = styled.tr``
const Td = styled.td`
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 10px;
  max-width: 120px;
`
const Image = styled.img`
  width: 100px;
  height: auto;
  transition: 0.15s all;
  &:hover {
    transform: scale(1.05);
  }
`
const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
`
const Select = styled.select`
  border: 1px solid rgba(0, 0, 0, 0.5);
  outline: none;
  font-size: 15px;
`
const Option = styled.option``
