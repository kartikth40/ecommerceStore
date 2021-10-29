import React from 'react'
import styled from 'styled-components'

const Pagination = ({ productsPerPage, totaProducts, Paginate }) => {
  let pageNumbers = []
  for (let i = 0; i < Math.ceil(totaProducts / productsPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  return (
    <Container>
      <PrevButton>Prev</PrevButton>
      {pageNumbers.map((number) => (
        <Button onClick={() => Paginate(number)}>{number}</Button>
      ))}
      <NextButton>Next</NextButton>
    </Container>
  )
}

export default Pagination

const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 50px;
  background: yellow;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 5px;
`
const PrevButton = styled(Button)`
  width: max-content;
`
const NextButton = styled(Button)`
  width: max-content;
`
