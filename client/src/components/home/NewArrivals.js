import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getProducts, getProductsCount } from '../../functions/product'
import ProductCard from '../cards/ProductCard'
import LoadingCard from '../cards/LoadingCard'
import Pagination from '../nav/Pagination'

const NewArrivals = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const [productsCount, setProductsCount] = useState(0)
  const [page, setPage] = useState(1)

  useEffect(() => {
    const loadAllProducts = () => {
      setLoading(true)
      // sort, order, page
      getProducts('createdAt', 'desc', page).then((res) => {
        setProducts(res.data)
        setLoading(false)
      })
    }
    loadAllProducts()
  }, [page])

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data))
  }, [])

  const Paginate = (number) => {
    if (number <= 0 || number > productsCount / 3) return
    setPage(number)
  }

  return (
    <>
      <ProductsContainer>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          products.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              loading={loading}
            />
          ))
        )}
      </ProductsContainer>
      <Pagination
        currentPage={page}
        productsPerPage={3}
        totaProducts={productsCount}
        Paginate={Paginate}
      />
    </>
  )
}
export default NewArrivals

const ProductsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
