import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category'
import { createSub, getSubs, removeSub } from '../../../functions/sub'
import SimpleInputForm from '../../../components/forms/SimpleInputForm'
import LocalSearch from '../../../components/forms/LocalSearch'
import ListOfElements from '../../../components/forms/ListOfElements'

import { Container, Content } from '../AdminDashboard'
import DropDownSelector from '../../../components/forms/DropDownSelector'

const SubCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const [subs, setSubs] = useState([])
  const { user } = useSelector((state) => ({ ...state }))
  const [category, setCategory] = useState('')
  // searching / filtering
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories()
    loadSubs()
  }, [subs])

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
      .catch((err) => console.log(err))

  const loadSubs = () =>
    getSubs()
      .then((c) => setSubs(c.data))
      .catch((err) => console.log(err))

  const handleRemove = async (slug) => {
    if (window.confirm('Delete ?')) {
      setLoading(true)
      removeSub(slug, user.token)
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

    createSub({ name, parent: category }, user.token)
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
        <Heading>
          {loading ? <>loading...</> : <>Create sub Category</>}
        </Heading>
        <DropDownSelector
          label="Select a category"
          setValue={setCategory}
          elements={categories}
          menuItem="name"
        />
        <SimpleInputForm
          label="Name"
          value={name}
          setValue={setName}
          handleSubmit={handleSubmit}
        />
        <LocalSearch keyword={keyword} setKeyword={setKeyword} />
        <ListOfElements
          elements={subs}
          keyword={keyword}
          edit={true}
          del={true}
          handleRemove={handleRemove}
        />
      </Content>
    </Container>
  )
}

export default SubCreate

const Heading = styled.h4``
