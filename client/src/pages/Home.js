import React from 'react'
import styled from 'styled-components'
import Jumbotron from '../components/cards/Jumbotron'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'

const Home = () => {
  return (
    <Container>
      <JumboHeading>
        <Jumbotron
          textArray={['Latest Products', 'New Arrivals', 'Best Sellers']}
        />
      </JumboHeading>
      <Content>
        <SubHeading>New Arrivals</SubHeading>
        <NewArrivals />
      </Content>
      <Content>
        <SubHeading>Best Sellers</SubHeading>
        <BestSellers />
      </Content>
    </Container>
  )
}

export default Home

const Container = styled.div`
  margin-top: 70px;
  text-align: center;
  font-weight: bold;
  font-size: 3rem;
`
const JumboHeading = styled.div`
  width: 100%;
  font-size: 5rem;
  margin-bottom: 2rem;
  color: red;
`

const Content = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  width: 85vw;
  max-width: 100vw;
  height: 100%;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  font-size: 1rem;
  flex-direction: column;
`
const SubHeading = styled.div`
  width: 100%;
  height: 100%;
  font-size: 4rem;
  color: rgba(255, 255, 255);
`
