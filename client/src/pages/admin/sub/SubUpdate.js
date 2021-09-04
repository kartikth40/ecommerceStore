import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { updateSub, getSub } from '../../../functions/sub'
import SimpleInputForm from '../../../components/forms/SimpleInputForm'

import { Container, Content, Heading } from '../AdminDashboard'

const SubUpdate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))
  const { slug } = useParams()

  useEffect(() => {
    const loadSub = () =>
      getSub(slug)
        .then((s) => setName(s.data.name))
        .catch((err) => console.log(err))
    loadSub()
  }, [slug])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    updateSub(slug, { name }, user.token)
      .then((res) => {
        setLoading(false)
        setName('')
        toast.success(`"${res.data.name}" is updated`)
        history.push('/admin/sub')
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
        <Heading>
          {loading ? <>loading...</> : <>Update Sub Category</>}
        </Heading>
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

export default SubUpdate
