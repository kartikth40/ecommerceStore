import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import StarRatings from 'react-star-ratings'
import { CardButton } from '../cards/AdminProductCard'
import RatingModal from '../modal/RatingModal'
import { useHistory, useParams } from 'react-router'
import { FaStar } from 'react-icons/fa'

const RatingButton = ({ _id, onStarClick, star }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const history = useHistory()
  const { slug } = useParams()
  const [modalVisible, setModalVisible] = useState(false)

  const handleClick = () => {
    if (!user) {
      history.push({ pathname: '/login', state: { from: `/product/${slug}` } })
    } else if (user && user.token) {
      if (modalVisible) {
        setModalVisible(false)
      } else {
        setModalVisible(true)
      }
    }
  }

  return (
    <BtnContainer onClick={() => handleClick()}>
      <RatingTitle>
        <RatingIcon />
        {user ? 'Leave a rating' : 'Login to leave rating'}
      </RatingTitle>
      <RatingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      >
        <StarRatings
          name={_id}
          numberOfStars={5}
          rating={star}
          changeRating={onStarClick}
          isSelectable={true}
          starRatedColor="red"
        />
      </RatingModal>
    </BtnContainer>
  )
}

export default RatingButton

const BtnContainer = CardButton

const RatingTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const RatingIcon = styled(FaStar)`
  font-size: 15px;
  margin-right: 5px;
`
