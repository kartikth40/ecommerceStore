import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import firebase from 'firebase'
import Search from '../forms/Search'
import { AiOutlineUserAdd, AiOutlineUser } from 'react-icons/ai'
import { FaHome, FaShoppingBag } from 'react-icons/fa'
import { TiUser } from 'react-icons/ti'

function Header() {
  const [current, setCurrent] = useState('Home-nav') // currently selected nav item

  const dispatch = useDispatch() // dispatch state into redux
  const { user } = useSelector((state) => ({ ...state })) // get state from redux
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    let path = location.pathname
    if (
      path !== '/' &&
      !path.includes('/shop') &&
      !path.includes('/register') &&
      !path.includes('/login')
    ) {
      setCurrent('no-nav')
    }
    if (path === '/') setCurrent('Home-nav')
    if (path.includes('/shop')) setCurrent('Shop-nav')
    if (path.includes('/register')) setCurrent('Register-nav')
    if (path.includes('/login')) setCurrent('Login-nav')

    document
      .querySelectorAll('.nav-item')
      .forEach((el) => el.classList.remove('selected'))
    if (
      current !== 'no-nav' &&
      current &&
      document.querySelector(`#${current}`)
    ) {
      document.querySelector(`#${current}`).classList.add('selected')
    }
  }, [current, location])

  const handleClick = (e) => {
    setCurrent(e.target.parentElement.id)
  }
  const logout = () => {
    firebase.auth().signOut() // firebase builtin function to logout user
    dispatch({
      // changing the login state from redux too
      type: 'LOGOUT',
      payload: null,
    })
    history.push('/login')
  }
  return (
    <HeaderContainer>
      <NavLeft>
        <NavItems id="Home-nav" className="nav-item" onClick={handleClick}>
          <NavLink to="/">
            <HomeIcon />
            <span>Home</span>
          </NavLink>
        </NavItems>
        <NavItems id="Shop-nav" className="nav-item" onClick={handleClick}>
          <NavLink to="/shop">
            <ShopIcon />
            <span>Shop</span>
          </NavLink>
        </NavItems>
      </NavLeft>
      <NavRight>
        <SearchBar>
          <Search />
        </SearchBar>
        {user && (
          <DropDownMenu>
            <DropDownBtn>
              <UserIcon />
              {user.email && user.email.split('@')[0]}
            </DropDownBtn>
            <DropDownContent>
              {user && user.role === 'subscriber' && (
                <span onClick={() => history.push('/user/history')}>
                  Dashboard
                </span>
              )}
              {user && user.role === 'admin' && (
                <span onClick={() => history.push('/admin/dashboard')}>
                  Dashboard
                </span>
              )}
              <span onClick={logout}>LogOut</span>
            </DropDownContent>
          </DropDownMenu>
        )}

        {!user && (
          <>
            <NavItems
              id="Register-nav"
              className="nav-item"
              onClick={handleClick}
            >
              <NavLink to="/register">
                <RegisterIcon />
                <span>Register</span>
              </NavLink>
            </NavItems>
            <NavItems id="Login-nav" className="nav-item" onClick={handleClick}>
              <NavLink to="/login">
                <LoginIcon />
                <span>Login</span>
              </NavLink>
            </NavItems>
          </>
        )}
      </NavRight>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  height: 70px;
  background: rgba(255, 255, 255, 1);
  width: 100%;
  padding: 10px;
  position: fixed;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  border-bottom: black solid 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
`
const NavItems = styled.div`
  display: inline-block;
  pointer-events: none;
  width: max-content;
`
const NavLeft = styled.div`
  display: flex;
`
const NavRight = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
`
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  font-size: 16px;
  border: 2px solid black;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin: 0.5rem;
  pointer-events: all;
  transition: 0.1s all;
  &:hover {
    border-radius: 7px;
    transform: scale(1.1);
  }
`

const DropDownBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid black;
  cursor: pointer;
`
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
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
const SearchBar = styled.div`
  margin: 0 0.5rem;
  height: 100%;
  padding-bottom: 0.3rem;
  border-bottom: 2px solid black;
`
const HomeIcon = styled(FaHome)`
  margin-right: 5px;
`
const ShopIcon = styled(FaShoppingBag)`
  margin-right: 5px;
`
const RegisterIcon = styled(AiOutlineUserAdd)`
  margin-right: 5px;
`
const LoginIcon = styled(AiOutlineUser)`
  margin-right: 5px;
`
const UserIcon = styled(TiUser)`
  margin-right: 5px;
`
