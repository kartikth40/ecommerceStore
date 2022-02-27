import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getProductsByCount, getProductsByFilter } from '../functions/product'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import SideFilterMenu from '../components/forms/SideFilterMenu'
import { getCategories } from '../functions/category'
import { getSubs } from '../functions/sub'
import device, { size as devSize } from '../mediaQueries'
import useWindowSize from '../useWindowSize'

const Shop = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [categoriesSelected, setCategoriesSelected] = useState([])
  const [subs, setSubs] = useState([])
  const [sub, setSub] = useState([])
  const [star, setStar] = useState(0)
  const brands = ['Apple', 'Microsoft', 'Samsung', 'Lenovo', 'Asus']
  const [brandsSelected, setBrandsSelected] = useState([])
  const colors = ['Black', 'Brown', 'Silver', 'White', 'Blue']
  const [colorsSelected, setColorsSelected] = useState([])
  const [shipping, setShipping] = useState('')

  const [filterClicked, setFilterClicked] = useState(false)

  const [loading, setLoading] = useState(false)

  const [price, setPrice] = useState(0)
  const [ok, setOk] = useState(false)

  const dispatch = useDispatch()
  let { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  let isLarge = useWindowSize() > devSize.tablet

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
      // ------------------------ resetting
      setPrice(0)
      setCategoriesSelected([])
      setStar(0)
      setSub([])
      setBrandsSelected([])
      setColorsSelected([])
      setShipping('')
      // ------------------------ resetting
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
  }, [price, ok])

  const handleFilterClick = () => {
    setFilterClicked(true)
    document.body.classList.add('hide-y')
  }

  return (
    <Container>
      <SideFilterMenu
        filterClicked={filterClicked}
        setFilterClicked={setFilterClicked}
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
        shipping={shipping}
        setShipping={setShipping}
      />
      <ProductsContainer>
        {loading ? (
          <Heading>Loading...</Heading>
        ) : (
          <Heading>
            {products.length < 1 ? 'No Products Found!' : 'Products Found.'}
          </Heading>
        )}
        {!isLarge && (
          <FilterContainer onClick={handleFilterClick}>Filter</FilterContainer>
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
  position: relative;
  margin-top: 70px;
  display: flex;
`

const ProductsContainer = styled.div`
  width: calc(100vw - 300px);
  height: 100%;
  margin: 2rem;
  margin-left: calc(300px + 2rem);
  position: relative;

  @media screen and ${device.tablet} {
    margin: 2rem;
    width: 100%;
  }
`
const Heading = styled.h2``
const FilterContainer = styled.button`
  position: absolute;
  top: -4px;
  right: 0;
  font-size: 20px;
  padding: 2px 10px;
  border: solid 1px black;
  cursor: pointer;

  &:hover,
  &:active {
    background-color: black;
    color: white;
  }
`
const ProductsList = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
`
