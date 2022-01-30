import React, { useState, useEffect } from 'react'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import {
  createCategory,
  getCategories,
  removeCategory,
} from '../../../functions/category'
import SimpleInputForm from '../../../components/forms/SimpleInputForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import ListOfElements from '../../../components/forms/ListOfElements'

import { Container, Content, Heading } from '../AdminDashboard'
import { getRefreshedIdToken } from '../../../functions/getRefreshedIdToken'

const CategoryCreate = () => {
  const [token, setToken] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  // searching / filtering
  const [keyword, setKeyword] = useState('')

  useEffect(async () => {
    setToken(await getRefreshedIdToken())
    loadCategories()
  }, [categories])

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err))

  const handleRemove = async (slug) => {
    if (window.confirm('Delete ?')) {
      setLoading(true)
      removeCategory(slug, token)
        .then((res) => {
          setLoading(false)
          toast.error(`${res.data.name} deleted.`)
        })
        .catch((err) => {
          if (err.response.status === 400) {
            setLoading(false)
            toast.error(err.response.data)
          }
        })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    createCategory({ name }, token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is created`)
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
        <Heading>{loading ? <>loading...</> : <>Create a Category</>}</Heading>
        <SimpleInputForm
          label="Name"
          value={name}
          setValue={setName}
          handleSubmit={handleSubmit}
        />
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        <ListOfElements
          elements={categories}
          elementName="category"
          keyword={keyword}
          edit={true}
          del={true}
          handleRemove={handleRemove}
        />
      </Content>
    </Container>
  )
}

export default CategoryCreate
