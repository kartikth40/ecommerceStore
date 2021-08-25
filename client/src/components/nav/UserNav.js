import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserNav = () => {
  return (
    <Nav>
      <NavList>
        <ListItem to="/user/history">History</ListItem>
        <ListItem to="/user/password">Password</ListItem>
        <ListItem to="/user/wishlist">Wishlist</ListItem>
      </NavList>
    </Nav>
  )
}

export default UserNav

const Nav = styled.nav`
  height: calc(100vh - 70px - 2rem);
  margin: 1rem;
  padding-right: 1rem;
  font-size: 2rem;
  border-right: 1px black solid;
`
const NavList = styled.ul``
const ListItem = styled(Link)`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  margin: 1rem 0;
  color: black;

  &:hover {
    opacity: 0.5;
  }
`
