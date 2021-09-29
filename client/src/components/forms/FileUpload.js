import React from 'react'
import styled from 'styled-components'

const FileUpload = () => {
  const fileUploadAndResize = (e) => {
    //resize - send back to server - set url to images[] in parent component state
  }

  return (
    <Container>
      <StyledLabel>
        Choose files
        <StyledInput
          type="file"
          multiple
          hidden
          accept="images/*"
          onChange={fileUploadAndResize}
        />
      </StyledLabel>
    </Container>
  )
}

export default FileUpload

const Container = styled.div``
const StyledLabel = styled.label`
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
const StyledInput = styled.input``
