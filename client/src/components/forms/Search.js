import React from 'react'
import styled from 'styled-components'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { FaSearch } from 'react-icons/fa'

const Search = () => {
  let dispatch = useDispatch()
  const { search } = useSelector((state) => ({ ...state }))
  const { text } = search

  const history = useHistory()

  const handleChange = (e) => {
    dispatch({
      type: 'SEARCH_QUERY',
      payload: { text: e.target.value },
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    history.push(`/shop?${text}`)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        typ="search"
        value={text}
        placeholder="Search"
      />
      <StyledIcon onClick={handleSubmit} />
    </Form>
  )
}

export default Search

const Form = styled.form``
const Input = styled.input`
  font-size: 1.5rem;
  font-weight: bold;
  width: 200px;
  outline: none;
  border: none;
`
const StyledIcon = styled(FaSearch)`
  &:hover {
    cursor: pointer;
  }
`
