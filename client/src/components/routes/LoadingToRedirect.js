import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import device from '../../mediaQueries'

const LoadingToRedirect = () => {
  const [count, setCount] = useState(5)
  let history = useHistory()

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount)
    }, 1000)
    // redirect once count is equal to 0
    count === 0 && history.push('/login')
    //cleanup
    return () => clearInterval(interval)
  }, [count, history])

  return (
    <Container>
      <Heading>
        Checking Admin Authorization or Redirecting you in {count} seconds...
      </Heading>
    </Container>
  )
}

export default LoadingToRedirect

const Container = styled.div`
  margin: 100px auto;
  width: 100vw;
`
const Heading = styled.h1`
  width: 100vw;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
  @media screen and ${device.tablet} {
    font-size: 2rem;
  }
  @media screen and ${device.mobile} {
    font-size: 1rem;
  }
`
