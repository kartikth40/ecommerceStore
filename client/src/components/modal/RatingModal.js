import React from 'react'
import styled from 'styled-components'

const RatingModal = ({ modalVisible, setModalVisible, children }) => {
  return (
    <ModalContainer>
      {modalVisible && (
        <Modal>
          <Close onClick={() => setModalVisible(false)}>X</Close>
          <ModalTitle>Leave a rating</ModalTitle>
          <ModalContent>{children}</ModalContent>
        </Modal>
      )}
    </ModalContainer>
  )
}

export default RatingModal

const ModalContainer = styled.div`
  position: relative;
`

const Modal = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  border: rgba(255, 0, 0, 0.5) solid 2px;
  position: absolute;
  width: 350px;
  bottom: 0;
  right: 0;
  z-index: 20;
  transform: translateY(-50%);
  overflow: hidden;
  &:hover {
    border: 2px solid rgba(255, 0, 0, 1);
  }
`
const Close = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 0, 0, 0.5);
  height: 20px;
  width: 100%;
  &:hover {
    background: rgba(255, 0, 0, 1);
  }
`
const ModalTitle = styled.h2`
  color: black;
  margin-top: 10px;
`
const ModalContent = styled.div`
  padding: 10px;
`
