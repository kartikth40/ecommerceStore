import React, { useState } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import laptop from '../../images/laptop.jpg'
import { FaShoppingCart } from 'react-icons/fa'

const SideDrawer = () => {
  const dispatch = useDispatch()
  const { drawer, cart } = useSelector((state) => ({ ...state }))

  const CloseDrawer = () => {
    dispatch({
      type: 'SET_VISIBLE',
      payload: false,
    })
  }
  return (
    <DrawerContainer visible={drawer}>
      <GlobalStyle visible={drawer} />
      <EmptySpace onClick={CloseDrawer}></EmptySpace>
      <Drawer>
        <Title>Cart / {cart.length} Product</Title>
        <CartItems>
          {cart.map((p) => (
            <CartItem key={p._id}>
              <div>
                {p.images[0] ? (
                  <Img src={p.images[0].url} alt="product" />
                ) : (
                  <Img src={laptop} alt="product" />
                )}
              </div>
              <ProductTitle>
                {p.title}
                <b> x {p.count}</b>
              </ProductTitle>
            </CartItem>
          ))}
        </CartItems>
        <StyledLink to="/cart" onClick={CloseDrawer}>
          <GoToCartButton>
            <CartIcon />
            Go To Cart
          </GoToCartButton>
        </StyledLink>
      </Drawer>
    </DrawerContainer>
  )
}

export default SideDrawer

const GlobalStyle = createGlobalStyle`
  body {
    overflow: ${(props) => (props.visible ? 'hidden' : 'auto')};
  }
`

const DrawerContainer = styled.div`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  position: fixed;
  top: 70px;
  left: 0;
  width: calc(100vw + 100px);
  height: calc(100vh - 70px);
  transition: 0.25s all ease-in;

  transform: translateX(${(props) => (props.visible ? '-100px' : '0')});
  opacity: ${(props) => (props.visible ? 1 : 0)};
  display: flex;
  z-index: 10;
`
const EmptySpace = styled.div`
  height: 100%;
  width: calc(100vw - 205px);
  background-color: rgba(0, 0, 0, 0.8);
`
const Drawer = styled.div`
  width: 300px;
  height: 100%;
  padding: 10px;
  overflow-wrap: break-word;
  background-color: white;
  overflow-y: auto;
  padding-bottom: 100px;
  padding-top: 70px;
`
const Title = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 10px;
  background-color: white;
  width: 295px;
  height: 50px;
`

const CartItems = styled.div`
  width: 100%;
`
const CartItem = styled.div`
  border: black solid 1px;
  margin: 5px 0;
`
const Img = styled.img`
  width: 100%;
  height: 100px;
  object-fit: cover;
`
const ProductTitle = styled.p`
  padding: 5px;
`
const GoToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  right: 50px;
  padding: 5px;
  width: 200px;
  height: 50px;
  background-color: rgba(50, 255, 50, 1);
  border: white 2px solid;
  box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
  transition: 0.15s all;
  font-weight: bold;
  font-size: 20px;

  &:hover {
    background-color: rgba(30, 255, 30, 1);
    transform: scale(0.95);
    box-shadow: 0 0 20px rgba(100, 255, 100, 0.5);
  }
`
const CartIcon = styled(FaShoppingCart)`
  margin-right: 10px;
`
const StyledLink = styled(Link)`
  text-decoration: none;
`
