import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { updateCategory, getCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

const CategoryUpdate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))
  const { slug } = useParams()

  useEffect(() => {
    const loadCategory = () =>
      getCategory(slug)
        .then((c) => setName(c.data.name))
        .catch((err) => console.log(err))
    loadCategory()
  }, [slug])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    updateCategory(slug, { name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
        history.push('/admin/category')
      })
      .catch((err) => {
        setLoading(false)
        console.log(err)
        if (err.response.status === 400) {
          toast.error(err.response.data)
        }
      })
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>{loading ? <>loading...</> : <>Update Category</>}</Heading>
        <CategoryForm
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />
        <CategoryList></CategoryList>
      </Content>
    </Container>
  )
}

export default CategoryUpdate

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
