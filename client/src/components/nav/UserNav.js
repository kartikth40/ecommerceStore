import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import device from '../../mediaQueries'

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
  @media screen and ${device.tablet} {
    width: 100%;
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
    background-color: white;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 3rem;
    margin: 0;
    padding: 0.5rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
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

  @media screen and ${device.tablet} {
    font-size: 1rem;
    text-decoration: underline;
  }
`
