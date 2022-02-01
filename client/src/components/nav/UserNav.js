import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UserNav = () => {
  return (
    <Nav>
      <NavList>
        <ListItem to="/user/history">History</ListItem>
        <ListItem to="/user/wishlist">Wishlist</ListItem>
        <ListItem to="/user/password">Password</ListItem>
      </NavList>
    </Nav>
  )
}

export default UserNav

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
  font-weight: bold;
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
