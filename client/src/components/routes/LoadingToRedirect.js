import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'

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
  }, [count])

  return <Container>Redirecting you in {count} seconds...</Container>
}

export default LoadingToRedirect

const Container = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`
