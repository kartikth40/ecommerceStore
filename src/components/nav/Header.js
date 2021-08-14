import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

function Header() {
  const [current, setCurrent] = useState('Home-nav')
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    document
      .querySelectorAll('.nav-item')
      .forEach((el) => el.classList.remove('selected'))
    document.querySelector(`#${current}`).classList.add('selected')
  }, [current])
  const handleClick = (e) => {
    setCurrent(e.target.parentElement.id)
  }
  const logout = () => {
    firebase.auth().signOut()
    dispatch({
      type: 'LOGOUT',
      payload: null,
    })
    history.push('/login')
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
            <span>Link 1</span>
            <span>Link 2</span>
            <span onClick={logout}>LogOut</span>
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
  pointer-events: none;
  width: max-content;
`
const NavLeft = styled.div``
const NavRight = styled.div`
  margin-left: auto;
`
const NavLink = styled(Link)`
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid black;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin: 0.5rem;
  pointer-events: all;
  &:hover {
    background-color: black;
    color: white;
  }
`

const DropDownBtn = styled.button`
  background-color: white;
  padding: 10px;
  margin: 0 10px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid black;
  cursor: pointer;
`
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  cursor: pointer;

  z-index: 1;
  & span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
  }
  & span:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
const DropDownMenu = styled.div`
  position: relative;
  display: inline-block;
  &:hover ${DropDownContent} {
    display: block;
  }
  &:hover ${DropDownBtn} {
    background-color: black;
    color: white;
  }
`
