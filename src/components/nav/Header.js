import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

function Header() {
  const [current, setCurrent] = useState('Home-nav')
  useEffect(() => {
    document
      .querySelectorAll('.nav-item')
      .forEach((el) => el.classList.remove('selected'))
    document.querySelector(`#${current}`).classList.add('selected')
  }, [current])
  const handleClick = (e) => {
    setCurrent(e.target.parentElement.id)
  }

  return (
    <HeaderContainer>
      <NavLeft>
        <NavItems id="Home-nav" className="nav-item" onClick={handleClick}>
          <NavLink to="/">Home</NavLink>
        </NavItems>
        <DropDownMenu>
          <DropDownBtn>UserName</DropDownBtn>
          <DropDownContent>
            <a href="#">Link 1</a>
            <a href="#">Link 2</a>
            <a href="#">Link 3</a>
          </DropDownContent>
        </DropDownMenu>
      </NavLeft>

      <NavRight>
        <NavItems id="Register-nav" className="nav-item" onClick={handleClick}>
          <NavLink to="/register">Register</NavLink>
        </NavItems>
        <NavItems id="Login-nav" className="nav-item" onClick={handleClick}>
          <NavLink to="/login">Login</NavLink>
        </NavItems>
      </NavRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

const NavItems = styled.div`
  display: inline-block;
  padding: 0.5rem;
  margin: 0.5rem;
  pointer-events: none;
`
const NavLeft = styled.div``
const NavRight = styled.div`
  margin-left: auto;
`
const NavLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px black solid;
  border-radius: 10px;
  pointer-events: all;
  &:hover {
    border-color: red;
  }
`

const DropDownBtn = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
`
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  & a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  & a:hover {
    background-color: #f1f1f1;
  }
`
const DropDownMenu = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropDownContent} {
    display: block;
  }
  &:hover ${DropDownBtn} {
    background-color: #3e8e41;
  }
`
