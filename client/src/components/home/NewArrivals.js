import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProducts } from '../../functions/product'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAllProducts()
  }, [])

  const loadAllProducts = () => {
    setLoading(true)
    // sort, order, limit
    getProducts('createdAt', 'desc', 3).then((res) => {
      setProducts(res.data)
      setLoading(false)
    })
  }

  return (
    <ProductsContainer>
      {loading ? (
        <LoadingCard count={3} />
      ) : (
        products.map((product) => (
          <ProductCard product={product} key={product._id} loading={loading} />
        ))
      )}
    </ProductsContainer>
  )
}
export default NewArrivals

const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
