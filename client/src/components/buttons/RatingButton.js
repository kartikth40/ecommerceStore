import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import { CardButton } from '../cards/AdminProductCard'
import RatingModal from '../modal/RatingModal'

const RatingButton = ({ _id }) => {
  const { user } = useSelector((state) => ({ ...state }))

  const [modalVisible, setModalVisible] = useState(false)

  const handleClick = () => {
    if (modalVisible) setModalVisible(false)
    else setModalVisible(true)
  }

  return (
    <BtnContainer onClick={() => handleClick()}>
      <RatingTitle>
        {user ? 'Leave rating' : 'Login to leave rating'}
      </RatingTitle>
      <RatingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <StarRatings
          name={_id}
          numberOfStars={5}
          rating={2}
          changeRating={(newRating, name) => {
            console.log('newRating', newRating, 'name', name)
          }}
          isSelectable={true}
          starRatedColor="red"
        />
      </RatingModal>
    </BtnContainer>
  )
}

export default RatingButton

const BtnContainer = CardButton

const RatingTitle = styled.div``
