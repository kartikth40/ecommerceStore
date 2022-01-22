import React from 'react'
import styled from 'styled-components'
import laptop from '../../images/laptop.jpg'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { FaTimesCircle, FaCheckCircle } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md'

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

  const handleQuantityChange = (e) => {
    let count = e.target.value
    if (e.target.value < 1) {
      count = 1
    }

    if (count > p.quantity) {
      toast.error(`Max available quantity: ${p.quantity}`)
      return
    }

    let cart = []

    if (window) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, index) => {
        if (product._id === p._id) {
          cart[index].count = count
        }
      })

      localStorage.setItem('cart', JSON.stringify(cart))
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
    }
  }

  const handleRemove = () => {
    let cart = []

    if (window) {
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      cart.map((product, index) => {
        if (product._id === p._id) {
          cart.splice(index, 1)
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
        <Td>
          <Input
            type="number"
            value={p.count}
            onChange={handleQuantityChange}
          />
        </Td>
        <Td>{p.shipping === 'Yes' ? <CheckIcon /> : <TimesIcon />}</Td>
        <Td>
          <DeleteIcon onClick={handleRemove} />
        </Td>
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
  text-align: center;
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
  font-size: 15px;
  cursor: pointer;
`
const Option = styled.option``
const Input = styled.input`
  width: 50px;
  border: 1px solid rgba(0, 0, 0, 0.5);
  padding: 0 5px;
  font-size: 15px;
  cursor: text;
`
const CheckIcon = styled(FaCheckCircle)`
  color: rgba(0, 255, 0, 0.6);
  font-size: 25px;
`
const TimesIcon = styled(FaTimesCircle)`
  color: rgba(255, 0, 0, 0.6);
  font-size: 25px;
`
const DeleteIcon = styled(MdDeleteForever)`
  font-size: 30px;
  cursor: pointer;
`
