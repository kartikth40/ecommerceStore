import React from 'react'
import { Card } from './AdminProductCard'
import Skeleton from './Skeleton'

const LoadingCard = ({ count }) => {
  let cards = []
  for (let i = 0; i < count; i++) {
    cards.push(
      <Card key={i}>
        <Skeleton type="cover" />
        <Skeleton type="title" />
        <Skeleton type="desc" />
      </Card>
    )
  }
  return cards
}

export default LoadingCard
