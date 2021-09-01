import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { getCategories } from '../../../functions/category'
import { createSub, getSubs, removeSub } from '../../../functions/sub'
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from '../../../components/forms/LocalSearch'

const SubCreate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState([])
  const { user } = useSelector((state) => ({ ...state }))
  const [category, setCategory] = useState('')
  // searching / filtering
  const [keyword, setKeyword] = useState('')

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = () =>
    getCategories()
      .then((c) => setCategories(c.data))
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
        <CategorySelection>
          <Label>Parent category :</Label>
          <Select onChange={(e) => setCategory(e.target.value)}>
            {categories.length &&
              categories.map((c) => {
                return (
                  <Option key={c._id} value={c._id}>
                    {c.name}
                  </Option>
                )
              })}
          </Select>
        </CategorySelection>
        <CategoryForm
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />
      </Content>
    </Container>
  )
}

export default SubCreate

const Container = styled.div`
  display: flex;
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
const CategorySelection = styled.div``
const Label = styled.label`
  margin-top: 2rem;
  display: block;
  font-size: 1rem;
  font-weight: medium;
`
const Select = styled.select`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const Option = styled.option``
