import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const FileUpload = ({ values, setValues }) => {
  const [loading, setLoading] = useState(false)

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

  const handleImageRemove = (public_id) => {
    setLoading(true)
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimages`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : '',
          },
        }
      )
      .then((res) => {
        console.log('success')
        setLoading(false)
        const { images } = values
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id
        })
        setValues({ ...values, images: filterImages })
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
      })
  }

  return (
    <Container>
      <Images>
        {values.images &&
          values.images.map((image) => {
            return (
              <ImageContainer key={image.public_id}>
                <DltBtn onClick={() => handleImageRemove(image.public_id)}>
                  {loading ? <Loader>X</Loader> : <div>X</div>}
                </DltBtn>
                <Img src={image.url} />
              </ImageContainer>
            )
          })}
      </Images>
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
const Images = styled.div``
const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  margin: 10px;
  position: relative;
  display: inline-block;
  border: 2px solid black;
`
const DltBtn = styled.button`
  font-size: 15px;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: white 2px solid;
  cursor: pointer;
  background: red;
  color: white;
  transition: all 0.25s;

  &:focus {
    transform: translate(50%, -50%) scale(1.5);
  }
`
const loadingAnime = keyframes`
  0% {
    transform:translate(-50%, -50%) rotate(0);
  }

  100% {
    transform:translate(-50%, -50%) rotate(360deg);
  }
`
const Loader = styled.div`
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 10px;
  height: 10px;
  transform-origin: bottom;

  animation: ${loadingAnime} 1s linear forwards infinite;
`
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
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
