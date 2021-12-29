import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getCategory } from '../../functions/category'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard'
import { Container } from '../admin/product/AllProducts'

const CategoryHome = () => {
  const [category, setCategory] = useState({})
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  const { slug } = useParams()

  useEffect(() => {
    setLoading(true)
    getCategory(slug).then((cat) => {
      console.log(cat.data)
      setCategory(cat.data)
    })
  }, [])

  return <Container>{slug}</Container>
}

export default CategoryHome
