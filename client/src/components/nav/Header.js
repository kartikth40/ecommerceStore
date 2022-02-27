import React, { useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import device from '../../mediaQueries'
import firebase from 'firebase'
import Search from '../forms/Search'
import { AiOutlineUserAdd, AiOutlineUser } from 'react-icons/ai'
import { FaHome, FaShoppingBag, FaShoppingCart } from 'react-icons/fa'
import { TiUser } from 'react-icons/ti'
import useWindowSize from '../../useWindowSize'
import { size as devSize } from '../../mediaQueries'

function Header() {
  let isLarge = useWindowSize() > devSize.tablet

  const [current, setCurrent] = useState('Home-nav') // currently selected nav item
  const [showNav, setShowNav] = useState(false)

  let hamRef = useRef()
  let navRef = useRef()
  let profileRef = useRef()
  let searchRef = useRef()
  const dispatch = useDispatch() // dispatch state into redux
  const { user, cart } = useSelector((state) => ({ ...state })) // get state from redux
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    let path = location.pathname
    if (
      path !== '/' &&
      !path.includes('/shop') &&
      !path.includes('/cart') &&
      !path.includes('/register') &&
      !path.includes('/login')
    ) {
      setCurrent('no-nav')
    }
    if (path === '/') setCurrent('Home-nav')
    if (path.includes('/shop')) setCurrent('Shop-nav')
    if (path.includes('/cart')) setCurrent('Cart-nav')
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

  useEffect(() => {
    const hideMenu = (event) => {
      if (
        !hamRef.current.contains(event.target) &&
        !navRef.current.contains(event.target) &&
        !profileRef?.current?.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        hamClick()
      } else if (
        navRef.current.contains(event.target) &&
        !profileRef?.current?.contains(event.target) &&
        !searchRef.current.contains(event.target)
      ) {
        setTimeout(() => {
          hamClick()
        }, 500)
      }
    }
    if (!isLarge && showNav) {
      document.addEventListener('click', hideMenu)
    }
    return () => document.removeEventListener('click', hideMenu)
  }, [isLarge, showNav])

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

  const hamClick = () => {
    setShowNav((prev) => !prev)
    const ham = document.querySelector('.hamburger-menu')
    ham.classList.toggle('clicked')
    ham.classList.toggle('unclicked')
  }
  return (
    <HeaderContainer>
      <HelperContainer>
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
          <NavItems id="Cart-nav" className="nav-item" onClick={handleClick}>
            <NavLink to="/cart">
              <CartIcon />
              <span>
                <span>Cart</span>
                {cart.length > 0 && (
                  <CartQuantity>
                    <span>{cart.length}</span>
                  </CartQuantity>
                )}
              </span>
            </NavLink>
          </NavItems>
        </NavLeft>
        <HamContainer ref={hamRef} onClick={hamClick}>
          <HamBurgerMenu className="hamburger-menu unclicked" />
        </HamContainer>
        <NavRight ref={navRef} className={showNav ? 'nav active' : 'nav'}>
          <SearchBar ref={searchRef}>
            <Search />
          </SearchBar>
          {user && (
            <DropDownMenu>
              <DropDownBtn ref={profileRef}>
                <UserIcon />
                <span>{user.email && user.email.split('@')[0]}</span>
              </DropDownBtn>
              <DropDownContent>
                {user && user.role === 'subscriber' && (
                  <span onClick={() => history.push('/user/history')}>
                    Dashboard
                  </span>
                )}
                {user && user.role === 'admin' && (
                  <span onClick={() => history.push('/admin/dashboard')}>
                    Admin Dashboard
                  </span>
                )}
                {user && user.role === 'admin' && (
                  <span onClick={() => history.push('/user/history')}>
                    User Dashboard
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
              <NavItems
                id="Login-nav"
                className="nav-item"
                onClick={handleClick}
              >
                <NavLink to="/login">
                  <LoginIcon />
                  <span>Login</span>
                </NavLink>
              </NavItems>
            </>
          )}
        </NavRight>
      </HelperContainer>
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
const HelperContainer = styled.div`
  font-family: var(--secondary-font-family);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;

  @media screen and ${device.tablet} {
    background: white;
  }
  @media screen and ${device.mobile} {
    padding: 20px 10px;
  }
`
const NavItems = styled.div`
  display: inline-block;
  pointer-events: none;
  width: max-content;
`
const NavLeft = styled.div`
  display: flex;
`
const HamContainer = styled.div`
  width: 50px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`
const HamBurgerMenu = styled.button`
  display: none;
  position: relative;
  height: 2px;
  width: 30px;
  background: black;
  border-radius: 10px;
  border: none;
  outline: none;
  transition: 0.25s transform 0.25s;
  cursor: pointer;

  &::before,
  &::after {
    content: '';
    position: absolute;
    height: 100%;
    width: 100%;
    background: black;
    border-radius: 10px;
    left: 0;
    transition: 1s all;
  }
  &::before {
    top: -10px;
  }
  &::after {
    top: 10px;
  }
  &.clicked {
    background: transparent;
  }
  &.clicked::before {
    animation: upperLine 0.35s forwards ease;
  }
  &.clicked::after {
    animation: lowerLine 0.35s forwards ease;
  }

  &.unclicked::before {
    animation: upperLineReverse 0.35s forwards ease;
  }
  &.unclicked::after {
    animation: lowerLineReverse 0.35s forwards ease;
  }
  @media screen and ${device.tablet} {
    display: block;
  }

  @keyframes upperLine {
    0% {
      top: -10px;
    }
    30% {
      top: 0px;
    }
    50% {
      transform: rotate(0);
    }
    100% {
      top: 0px;
      transform: rotate(45deg);
    }
  }

  @keyframes lowerLine {
    0% {
      top: 10px;
    }
    50% {
      top: 0px;
    }
    80% {
      transform: rotate(0);
    }
    100% {
      top: 0px;
      transform: rotate(-45deg);
    }
  }

  @keyframes upperLineReverse {
    0% {
      top: 0px;
      transform: rotate(45deg);
    }
    50% {
      transform: rotate(0);
    }
    80% {
      top: 0px;
    }
    100% {
      top: -10px;
    }
  }

  @keyframes lowerLineReverse {
    0% {
      top: 0px;
      transform: rotate(-45deg);
    }
    30% {
      transform: rotate(0);
    }
    50% {
      top: 0px;
    }
    100% {
      top: 10px;
    }
  }
`
const NavRight = styled.div`
  display: flex;
  align-items: flex-end;
  margin-left: auto;
  @media screen and ${device.tablet} {
    background: white;
    border-bottom: black solid 2px;
    box-shadow: 0px 15px 10px rgba(0, 0, 0, 0.5);
    position: absolute;
    height: max-content;
    z-index: -1;
    left: 150%;
    top: 65px;
    width: 100%;
    padding: 20px 5px;

    align-items: center;
    justify-content: center;

    transition: 500ms all;
    &.active {
      left: 0;
    }

    & button {
      margin-top: 10px;
    }
  }

  @media screen and ${device.tablet} {
    flex-direction: column;
    align-items: flex-end;
  }
`
const NavLink = styled(Link)`
  height: 35px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  font-weight: 400;
  font-size: 16px;
  border: 2px solid black;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  margin: 0.5rem;
  pointer-events: all;
  transition: 0.1s all;
  &:hover {
    border: 2px solid white;
    border-bottom: 2px solid black;
  }
  & > span {
    display: flex;
    align-items: flex-end;
    transform: translateY(3px);
  }
  @media screen and ${device.mobile} {
    padding: 0 5px;
  }
`

const DropDownBtn = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  border: 2px solid black;
  cursor: pointer;
  color: black;
  & > span {
    display: flex;
    align-items: flex-end;
    transform: translateY(3px);
  }
`
const DropDownContent = styled.div`
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  border: 2px solid black;
  cursor: pointer;

  z-index: 1;
  & span {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 15px;
  }
  & span:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`
const DropDownMenu = styled.div`
  position: relative;
  display: inline-block;
  width: max-content;
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
  & form {
    width: max-content;
  }
`
const HomeIcon = styled(FaHome)`
  margin-right: 5px;
  font-size: 15px;
`
const ShopIcon = styled(FaShoppingBag)`
  margin-right: 5px;
  font-size: 15px;
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
const CartIcon = styled(FaShoppingCart)`
  margin-right: 5px;
  font-size: 15px;
`
const CartQuantity = styled.span`
  display: inline-block;
  position: relative;
  margin-left: 25px;
  & span {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    left: -20px;
    top: -20px;
    width: 20px;
    height: 20px;
    background-color: red;
    color: white;
  }
`
