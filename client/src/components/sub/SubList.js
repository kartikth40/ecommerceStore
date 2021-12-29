import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { getSubs } from '../../functions/sub'

const SubList = () => {
  const [subs, setSubs] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getSubs().then((sub) => {
      setSubs(sub.data)
      setLoading(false)
    })
  }, [])

  const showSubs = () =>
    subs
      .sort((sub1, sub2) => {
        let a = sub1.name.toLowerCase()
        let b = sub2.name.toLowerCase()
        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
      .map((sub) => (
        <SubButton key={sub._id} to={`/sub/${sub.slug}`}>
          {sub.name}
        </SubButton>
      ))

  return (
    <Container>
      {loading ? <LoadingText>loading...</LoadingText> : showSubs()}
    </Container>
  )
}

export default SubList

const Container = styled.div`
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 20px;
`
const LoadingText = styled.div``
const SubButton = styled(Link)`
  flex-grow: 1;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
  width: max-content;
  background-color: white;
  color: black;
  padding: 20px;
  margin: 5px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
  }
`
