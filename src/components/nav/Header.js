import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
