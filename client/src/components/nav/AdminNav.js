import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const AdminNav = () => {
  return (
    <Nav>
      <NavList>
        <ListItem to="/admin/dashboard">Dashboard</ListItem>
        <ListItem to="/admin/product">Product</ListItem>
        <ListItem to="/admin/products">Products</ListItem>
        <ListItem to="/admin/category">Category</ListItem>
        <ListItem to="/admin/sub">Sub Category</ListItem>
        <ListItem to="/admin/coupons">Coupons</ListItem>
        <ListItem to="/user/password">Password</ListItem>
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
`
const NavList = styled.ul`
  height: 80%;
  margin: 1rem;
  padding-right: 1rem;
  border-right: 1px black solid;
  position: fixed;
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
