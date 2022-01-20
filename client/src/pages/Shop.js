import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getProductsByCount, getProductsByFilter } from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import SideFilterMenu from '../components/forms/SideFilterMenu'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [subs, setSubs] = useState([])
  const [sub, setSub] = useState([])
  const [star, setStar] = useState(0)
  const [brands, setBrands] = useState([
    'Apple',
    'Microsoft',
    'Samsung',
    'Lenovo',
    'Asus',
  ])
  const [brandsSelected, setBrandsSelected] = useState([])
  const [colors, setColors] = useState([
    'Black',
    'Brown',
    'Silver',
    'White',
    'Blue',
  ])
  const [colorsSelected, setColorsSelected] = useState([])

  const [loading, setLoading] = useState(false)

  const [price, setPrice] = useState(0)
  const [ok, setOk] = useState(false)

  const dispatch = useDispatch()
  let { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  useEffect(() => {
    loadAllProducts()
    getCategories().then((res) => setCategories(res.data))
    getSubs().then((res) => setSubs(res.data))
  }, [])

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ query: text })
    }, 300)
    if (text.length) {
      setPrice(0)
      setStar(0)
      setCategoriesSelected([])
      // resetting
    }

    return () => clearTimeout(delayed)
  }, [text])

  // load products by default on page load
  const loadAllProducts = () => {
    setLoading(true)
    getProductsByCount(12).then((p) => {
      setProducts(p.data)
      setLoading(false)
    })
  }

  // load products on user search input

  const fetchProducts = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data)
    })
  }

  // load products based on price range
  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchProducts({ price })
    }, 300)
    return () => clearTimeout(delayed)
  }, [ok])

  return (
    <Container>
      <SideFilterMenu
        fetchProducts={fetchProducts}
        price={price}
        setPrice={setPrice}
        dispatch={dispatch}
        setOk={setOk}
        categories={categories}
        setCategoriesSelected={setCategoriesSelected}
        categoriesSelected={categoriesSelected}
        star={star}
        setStar={setStar}
        subs={subs}
        sub={sub}
        setSub={setSub}
        brands={brands}
        brandsSelected={brandsSelected}
        setBrandsSelected={setBrandsSelected}
        colors={colors}
        colorsSelected={colorsSelected}
        setColorsSelected={setColorsSelected}
      />
      <ProductsContainer>
        {loading ? (
          <Heading>Loading...</Heading>
        ) : (
          <Heading>
            {products.length < 1 ? 'No Products Found!' : 'Products Found.'}
          </Heading>
        )}
        <ProductsList>
          {products.map((product) => (
            <ProductCard
              product={product}
              key={product._id}
              loading={loading}
            />
          ))}
        </ProductsList>
      </ProductsContainer>
    </Container>
  )
}

export default Shop

const Container = styled.div`
  margin-top: 70px;
  display: flex;
`

const ProductsContainer = styled.div`
  width: calc(100vw - 300px);
  height: 100%;
  margin: 2rem;
`
const Heading = styled.h2``
const ProductsList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
