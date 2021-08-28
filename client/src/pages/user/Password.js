import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Password = () => {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(setLoading(false))
        setPassword('')
        toast.success('Password Updated Successfully.')
      })
      .catch((err) => {
        console.log(err)
        setLoading(false)
        toast.error(err.message)
      })
  }

  const passwordUpdateForm = () => {
    return (
      <PasswordForm onSubmit={handleSubmit}>
        <PasswordInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Enter New Password"
          disabled={loading}
        />
        <br />
        <PasswordSubmit
          type="submit"
          disable={!password || loading || password.length < 6}
        >
          Submit
        </PasswordSubmit>
      </PasswordForm>
    )
  }

  return (
    <Container>
      <UserNav />
      <Content>
        <PasswordHeading>
          {loading ? <>loading</> : <>Update Password</>}
        </PasswordHeading>
        <br />
        {passwordUpdateForm()}
      </Content>
    </Container>
  )
}

export default Password
const Container = styled.div`
  display: flex;
  height: calc(100vh - 70px);
`
const Content = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const PasswordHeading = styled.h2`
  font-size: 3rem;
  font-weight: bold;
`
const PasswordForm = styled.form`
  width: 300px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const PasswordInput = styled.input`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const PasswordSubmit = styled.button`
  background-color: black;
  color: white;
  display: block;
  font-size: 30px;
  padding: 10px 20px;
  border: none;
  transition: 250ms all;
  &:hover {
    opacity: 0.85;
    border-radius: 50px;
  }
  &:focus {
    opacity: 0.5;
    border-radius: 50px 50px 0 50px;
  }

  ${({ disable }) =>
    disable &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
      &:hover,
      &:focus {
        opacity: 0.5;
        border-radius: 0;
      }
    `}
`
