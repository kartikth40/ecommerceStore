import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useHistory } from 'react-router'
import AdminNav from '../../../components/nav/AdminNav'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { updateCategory, getCategory } from '../../../functions/category'

const CategoryUpdate = () => {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const { user } = useSelector((state) => ({ ...state }))
  const { slug } = useParams()

  useEffect(() => {
    loadCategory()
  }, [])

  const loadCategory = () =>
    getCategory(slug)
      .then((c) => setName(c.data.name))
      .catch((err) => console.log(err))

  const categoryForm = () => {
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
          if (err.response.status == 400) {
            toast.error(err.response.data)
          }
        })
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Label>Name: </Label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
          required
        />
        <Button>SAVE</Button>
      </Form>
    )
  }

  return (
    <Container>
      <AdminNav />
      <Content>
        <Heading>{loading ? <>loading...</> : <>Update Category</>}</Heading>
        {categoryForm()}
        <CategoryList>
          {/* {categories.map((c) => {
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
          })} */}
        </CategoryList>
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
const Form = styled.form``
const Label = styled.label`
  margin-top: 2rem;
  display: block;
  font-size: 1rem;
  font-weight: medium;
`
const Input = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const Button = styled.button`
  background-color: black;
  background-image: linear-gradient(10deg, #000000 0%, #434343 74%);
  color: white;
  display: block;
  font-size: 30px;
  padding: 10px 20px;
  margin: 2rem 0;
  border: none;
  border-radius: 10px;
  transition: 250ms all;
  &:hover {
    opacity: 0.85;
    border-radius: 50px;
  }
  &:focus,
  &:active {
    opacity: 0.5;
    border-radius: 50px 50px 0 50px;
  }
`
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
