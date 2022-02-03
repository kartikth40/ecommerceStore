import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useParams } from 'react-router'
import { updateCategory, getCategory } from '../../../functions/category'
import SimpleInputForm from '../../../components/forms/SimpleInputForm'

import { Container, Content, Heading } from '../AdminDashboard'
import { getRefreshedIdToken } from '../../../functions/getRefreshedIdToken'

const CategoryUpdate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { slug } = useParams()

  useEffect(() => {
    const loadCategory = () =>
      getCategory(slug)
        .then((c) => setName(c.data.name))
        .catch((err) => console.log('ERROR LOADING CATEGORIES LIST -->', err))
    loadCategory()
  }, [slug])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    let token = await getRefreshedIdToken()
    updateCategory(slug, { name }, token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
        history.push('/admin/category')
      })
      .catch((err) => {
        setLoading(false)
        console.log('ERROR UPDATING EXISTING PRODUCT CATEGORY -->', err)
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
        <SimpleInputForm
          label="Name"
          value={name}
          setValue={setName}
          handleSubmit={handleSubmit}
        />
      </Content>
    </Container>
  )
}

export default CategoryUpdate
