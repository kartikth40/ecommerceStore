import React from 'react'
import styled from 'styled-components'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const fileUploadAndResize = (e) => {
    // resize
    let files = e.target.files
    let allUploadedFiles = values.images

    if (files) {
      setLoading(true)
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          'JPEG',
          100,
          0,
          (url) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: url },
                {
                  headers: {
                    authtoken: user ? user.token : '',
                  },
                }
              )
              .then((res) => {
                console.log('IMAGE UPLOAD RES DATA', res)
                setLoading(false)
                allUploadedFiles.push(res.data)
                setValues({ ...values, images: allUploadedFiles })
              })
              .catch((err) => {
                console.log('CLOUDINARY UPLOAD ERROR.')
                setLoading(false)
              })
          },
          'base64'
        )
      }
    }
    // send back to server
    // set url to images[] in parent component state
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
