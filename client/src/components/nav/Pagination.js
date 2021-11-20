import React from 'react'
import styled from 'styled-components'

const Pagination = ({
  currentPage,
  productsPerPage,
  totaProducts,
  Paginate,
}) => {
  let pageNumbers = []
  for (let i = 0; i < Math.ceil(totaProducts / productsPerPage); i++) {
    pageNumbers.push(i + 1)
  }

  const goToPrevPage = () => {
    Paginate(currentPage - 1)
  }

  const goToNextPage = () => {
    Paginate(currentPage + 1)
  }

  return (
    <Container>
      <PrevButton onClick={goToPrevPage}>Prev</PrevButton>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          selected={number === currentPage}
          onClick={() => Paginate(number)}
        >
          {number}
        </Button>
      ))}
      <NextButton onClick={goToNextPage}>Next</NextButton>
    </Container>
  )
}

export default Pagination

const Container = styled.div`
  margin: 1rem 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Button = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

  background-color: ${(props) =>
    props.selected ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 0.9)'};
  color: ${(props) =>
    props.selected ? 'rgba(255, 255, 255, 1)' : 'rgba(0,0,0,1)'};

  &:hover {
    background-color: rgba(0, 0, 0, 1);
    color: rgba(255, 255, 255, 1);
  }
`
const PrevButton = styled(Button)`
  width: max-content;
`
const NextButton = styled(Button)`
  width: max-content;
`
