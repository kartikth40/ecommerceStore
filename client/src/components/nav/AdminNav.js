import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import device, { size as devSize } from '../../mediaQueries'
import useWindowSize from '../../useWindowSize'

const AdminNav = () => {
  let isLarge = useWindowSize() > devSize.tablet

  useEffect(() => {
    document.body.classList.remove('hide-y')
  }, [])

  const [sideBtnClicked, setSideBtnClicked] = useState(false)

  const handleSideBtn = () => {
    const navlist = document.querySelector('.nav-list')
    if (!sideBtnClicked) {
      navlist.style.transform = 'translateY(0)'
      document.body.classList.add('hide-y')
    } else {
      navlist.style.transform = 'translateY(100%)'
      document.body.classList.remove('hide-y')
    }
    setSideBtnClicked((prev) => !prev)
  }

  return (
    <Nav>
      <NavList className="nav-list">
        <ListItem to="/admin/dashboard">Dashboard</ListItem>
        <ListItem to="/admin/product">Product</ListItem>
        <ListItem to="/admin/products">Products</ListItem>
        <ListItem to="/admin/category">Category</ListItem>
        <ListItem to="/admin/sub">Sub Category</ListItem>
        <ListItem to="/admin/coupons">Coupons</ListItem>
        <ListItem to="/user/password">Password</ListItem>
        {!isLarge && <SideButton onClick={handleSideBtn}></SideButton>}
      </NavList>
    </Nav>
  )
}

export default AdminNav

const Nav = styled.nav`
  width: 300px;
  position: relative;
  height: calc(100vh - 70px - 2rem);
  font-size: 2rem;
  @media screen and ${device.tablet} {
    width: 0;
    height: 0;
  }
`
const NavList = styled.ul`
  height: 80%;
  margin: 1rem;
  padding-right: 1rem;
  border-right: 1px black solid;
  position: fixed;

  @media screen and ${device.tablet} {
    bottom: 0;
    left: 0;
    transform: translateY(100%);
    border: none;
    background-color: white;
    box-shadow: 10px 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    height: calc(100% - 70px - 20px);
    margin: 0;
    padding: 0.5rem;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    transition: 500ms all;
  }
`
const SideButton = styled.button`
  border-radius: 20px 20px 0 0;
  position: absolute;
  top: 0;
  transform: translateY(-100%);
  height: 20px;
  width: 100%;
  background-color: #343434;
  border: none;
  cursor: pointer;
  &:after {
    content: '';
    top: 50%;
    position: absolute;
    width: 50%;
    height: 5px;
    background-color: white;
    transform: translate(-50%, -50%);
    border-radius: 5px;
  }
`
const ListItem = styled(Link)`
  display: flex;
  font-size: 1.5rem;
  text-transform: uppercase;
  flex-direction: column;
  text-decoration: none;
  text-align: left;
  margin: 1rem 0;
  color: black;

  &:hover {
    opacity: 0.5;
  }
`
