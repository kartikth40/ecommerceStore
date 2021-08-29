import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    loadCategories()
  }, [categories])

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err))

  const handleRemove = async (slug) => {
    if (window.confirm('Delete ?')) {
      setLoading(true)
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} deleted.`)
        })
        .catch((err) => {
          if (err.response.status == 400) {
            setLoading(false)
            toast.error(err.response.data)
          }
        })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is created`)
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        if (err.response.status == 400) {
          toast.error(err.response.data)
        }
      })
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>{loading ? <>loading...</> : <>Create a Category</>}</Heading>
        <CategoryForm
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />
        <CategoryList>
          {categories.map((c) => {
            return (
              <CategoryListItem key={c._id}>
                <CategoryListItemOverlapped>
                  <div>{c.name}</div>
                  <div>
                    <DeleteBTN onClick={() => handleRemove(c.slug)}>
                      Delete
                    </DeleteBTN>
                    <EditBTN to={`/admin/category/${c.slug}`}>Edit</EditBTN>
                  </div>
                </CategoryListItemOverlapped>
              </CategoryListItem>
            )
          })}
        </CategoryList>
      </Content>
    </Container>
  )
}

export default CategoryCreate

const Container = styled.div`
  display: flex;
  // height: calc(100vh - 70px);
  font-weight: bold;
  font-size: 3rem;
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  margin: 2rem;
  display: flex;
  flex-direction: column;
`
const Heading = styled.h3``
const CategoryList = styled.div`
  border-radius: 20px;
  text-align: left;
  font-size: 1rem;
  font-weight: light;
  position: relative;
  overflow: hidden;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.5);
`
const CategoryListItem = styled.div`
  width: 100%;
  height: 3rem;
`
const CategoryListItemOverlapped = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background-image: linear-gradient(10deg, #000000 0%, #434343 74%);
  color: white;
  border-radius: 20px 20px 0 0;
  height: 7rem;
  padding: 1rem;
  position: absolute;
  left: 0;
  right: 0;
`
const DeleteBTN = styled.button`
  padding: 5px;
  color: rgb(255, 150, 150);
  background: transparent;
  border: none;
  font-size: 1rem;
  font-weight: light;
  cursor: pointer;
`
const EditBTN = styled(Link)`
  text-decoration: none;
  padding: 5px;
  color: rgb(255, 150, 150);
  background: transparent;
  font-size: 1rem;
  font-weight: light;
`
