import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { updateCategory, getCategory } from '../../../functions/category'
import CategoryForm from '../../../components/forms/CategoryForm'

import { Container, Content } from '../AdminDashboard'

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
      </Content>
    </Container>
  )
}

export default CategoryUpdate

const Heading = styled.h4``
