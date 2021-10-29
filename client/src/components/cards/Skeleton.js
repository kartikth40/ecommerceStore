import React from 'react'
import styled, { keyframes } from 'styled-components'

const Skeleton = ({ type }) => {
  const coverType = type === 'cover' ? true : false
  const titleType = type === 'title' ? true : false
  const descType = type === 'desc' ? true : false

  return (
    <Container>
      {coverType && (
        <Cover>
          <ShimmerContainer>
            <Shimmer />
          </ShimmerContainer>
        </Cover>
      )}
      {titleType && (
        <Title>
          <ShimmerContainer>
            <Shimmer />
          </ShimmerContainer>
        </Title>
      )}
      {descType && (
        <Desc>
          <ShimmerContainer>
            <Shimmer />
          </ShimmerContainer>
        </Desc>
      )}
    </Container>
  )
}

export default Skeleton

const Container = styled.div`
  width: 90%;
`
const Cover = styled.div`
  position: relative;
  overflow: hidden;
  height: 150px;
  width: calc(300px - 20px);
  border-radius: 10px;
  margin: 10px;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.1);
`
const Title = styled.div`
  position: relative;
  overflow: hidden;
  margin: 10px;
  width: 90%;
  background-color: rgba(0, 0, 0, 0.1);
  height: 30px;
`
const Desc = styled.div`
  position: relative;
  overflow: hidden;
  margin: 10px;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  height: 50px;
`
const loading = keyframes`
  0% {
    transform: translateX(-150%);
  }
  100% {
    transform: translateX(150%);
  }`
const ShimmerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: ${loading} 1.5s infinite;
`
const Shimmer = styled.div`
  width: 50%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  transform: skewX(-20deg);
  box-shadow: 0 0 30px 30px rgba(255, 255, 255, 0.05);
`
