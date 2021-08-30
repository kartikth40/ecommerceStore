import React from 'react'
import styled from 'styled-components'

const LocalSearch = ({ keyword, setKeyword }) => {
  const handleSearchChange = (e) => {
    e.preventDefault()
    setKeyword(e.target.value.toLowerCase())
  }

  return (
    <Container>
      <SearchInput
        type="search"
        placeholder="Filter"
        value={keyword}
        onChange={handleSearchChange}
      />
    </Container>
  )
}

export default LocalSearch

const Container = styled.div`
  margin: 2rem 0;
`
const SearchInput = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
