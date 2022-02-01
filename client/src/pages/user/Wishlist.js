import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import UserNav from '../../components/nav/UserNav'
import { Heading } from '../admin/AdminDashboard'
import { Link } from 'react-router-dom'
import { getWishlist, removeWishlist } from '../../functions/user'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'
import { toast } from 'react-toastify'
import { MdDeleteForever } from 'react-icons/md'

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([])
  const [token, setToken] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(async () => {
    setToken(await getRefreshedIdToken())
    loadWishlist()
  }, [token])

  const loadWishlist = () => {
    if (!token) return
    getWishlist(token)
      .then((res) => {
        setLoading(false)
        console.log(res.data.wishlist)
        setWishlist(res.data.wishlist)
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERROR Getting the users wishlist from db', err)
      })
  }

  const removeItemFromWishlist = (productId, title) => {
    removeWishlist(productId, token)
      .then((res) => {
        loadWishlist()
        toast.success(`Removed "${title}" from your wishlist`)
      })
      .catch((err) =>
        console.log('Error removing the item from user wishlist', err)
      )
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
                <RemoveItem
                  onClick={() =>
                    removeItemFromWishlist(product._id, product.title)
                  }
                >
                  <RemoveIcon />
                </RemoveItem>
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
const RemoveItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 0, 0, 0.8);
`
const RemoveIcon = styled(MdDeleteForever)``
