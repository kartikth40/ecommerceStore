import React from 'react'
import styled from 'styled-components'
import device from '../mediaQueries'
import Jumbotron from '../components/cards/Jumbotron'
import BestSellers from '../components/home/BestSellers'
import NewArrivals from '../components/home/NewArrivals'
import CategoryList from '../components/category/CategoryList'
import SubList from '../components/sub/SubList'

const Home = () => {
  return (
    <Container>
      <JumboHeading>
        <Jumbotron
          textArray={['Latest Products', 'New Arrivals', 'Best Sellers']}
        />
      </JumboHeading>
      <Section>
        <SubHeading>New Arrivals</SubHeading>
        <NewArrivals />
      </Section>
      <Section>
        <SubHeading>Best Sellers</SubHeading>
        <BestSellers />
      </Section>
      <Section>
        <SubHeading>Categories</SubHeading>
        <CategoryList />
      </Section>
      <Section>
        <SubHeading>Sub Categories</SubHeading>
        <SubList />
      </Section>
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

  & * {
    font-family: 'Lobster', cursive;
  }

  @media screen and ${device.mobile} {
    font-size: 2rem;
    padding-top: 2rem;
  }
`

const Section = styled.div`
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

  @media screen and ${device.mobile} {
    width: 90vw;
  }
`
const SubHeading = styled.div`
  width: 100%;
  height: 100%;
  font-size: 4rem;
  color: rgba(0, 0, 0);
  text-decoration: underline;

  @media screen and ${device.mobile} {
    font-size: 2rem;
  }
`
