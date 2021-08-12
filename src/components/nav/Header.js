import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Header() {
  const [current, setCurrent] = useState('Home')
  useEffect(() => {
    document
      .querySelectorAll('.nav-item')
      .forEach((el) => el.classList.remove('selected'))
    document.querySelector(`.${current}-nav`).classList.add('selected')
  }, [current])
  const handleClick = (e) => {
    setCurrent(e.target.innerHTML)
  }

  return (
    <HeaderContainer>
      <NavItems className="nav-item Home-nav" onClick={handleClick}>
        Home
      </NavItems>
      <NavItems className="nav-item Register-nav" onClick={handleClick}>
        Register
      </NavItems>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const NavItems = styled.button`
  padding: 0.5rem;
  margin: 0.5rem;
`
