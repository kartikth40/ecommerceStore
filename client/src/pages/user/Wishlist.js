import React, { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'
import { Heading } from '../admin/AdminDashboard'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getWishlist, removeWishlist } from '../../functions/user'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  const loadWishlist = useCallback(() => {
    if (!token) return
    getWishlist(token)
      .then((res) => {
        setLoading(false)
        setWishlist(res.data.wishlist)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERROR LOADING USER WISHLIST -->', err)
      })
  }, [token])

  useEffect(() => {
    const func = async () => {
      setToken(await getRefreshedIdToken())
      loadWishlist()
    }
    func()
  }, [token, loadWishlist])

  const dispatch = useDispatch()

  const removeItemFromWishlist = (productId) => {
    removeWishlist(productId, token)
      .then((res) => {
        loadWishlist()
      })
      .catch((err) =>
        console.log('ERROR REMOVING THE ITEMS FROM THE WISHLIST -->', err)
      )
  }

  const handleAddToCart = (product) => {
    // create cart array
    let cart = []
    if (window) {
      // check if cart is already in localStorage
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }
      // push new product
      cart.push({
        ...product,
        count: 1,
      })
      // remove duplicates
      cart = cart.filter(
        (product, index, array) =>
          array.findIndex((p) => p._id === product._id) === index
      )
      localStorage.setItem('cart', JSON.stringify(cart))

      //add to redux state
      dispatch({
        type: 'ADD_TO_CART',
        payload: cart,
      })
      //show cart items inside drawer
      dispatch({
        type: 'SET_VISIBLE',
        payload: true,
      })

      //remove from wishlist
      removeItemFromWishlist(product._id)
    }
  }
  return (
    <Container>
      <UserNav />
      <Content>
        {loading ? (
          <Heading>Loading your wishlist...</Heading>
        ) : (
          <Heading>Your Wishlist</Heading>
        )}

        {!loading && (
          <WishListContainer>
            {wishlist.map((product) => (
              <ProductContainer key={product._id}>
                <ProductName to={`/product/${product.slug}`}>
                  {product.title}
                </ProductName>
                <Buttons>
                  <AddToCartBtn
                    disabled={product.quantity < 1}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to cart
                  </AddToCartBtn>
                  <RemoveItem
                    onClick={() => removeItemFromWishlist(product._id)}
                  >
                    Remove
                  </RemoveItem>
                </Buttons>
              </ProductContainer>
            ))}
          </WishListContainer>
        )}
      </Content>
    </Container>
  )
}

export default Wishlist

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`
const Content = styled.div`
  text-align: left;
  font-weight: bold;
  width: 100%;
  margin-right: 5rem;
`
const WishListContainer = styled.div`
  width: 100%;
`
const ProductContainer = styled.div`
  border: solid 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  width: 100%;
  overflow: hidden;
  margin: 1rem 0;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`
const ProductName = styled(Link)`
  display: block;
  font-weight: 400;
  font-size: 25px;
  text-decoration: none;
  color: black;
  &:visited {
    color: black;
  }
  &:hover {
    text-decoration: underline;
  }
`
const Buttons = styled.div`
  text-align: center;
`
const AddToCartBtn = styled.button`
  border: 2px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  margin-bottom: 10px;
`
const RemoveItem = styled.div`
  cursor: pointer;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 0.8);
    text-decoration: underline;
  }
`
