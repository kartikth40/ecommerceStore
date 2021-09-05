import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styled from 'styled-components'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user, history])

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    if (!email) {
      toast.error('Enter a valid Email.')
      setLoading(false)
      return
    }

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    }

    auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail('')
        setLoading(false)
        toast.success('Check your email for password reset link.')
        history.push('/login')
      })
      .catch((error) => {
        if (error.code === 'auth/user-not-found') {
          toast.error('Please enter a registered email.')
        } else {
          toast.error(error.message)
        }
        console.log(error)
        setLoading(false)
      })
  }

  return (
    <Container>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <ForgotForm onSubmit={handleSubmit}>
          <h4>Forgot Password</h4>
          <ForgotInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Enter Your Registered Email"
          />
          <br />
          <ForgotSubmit type="submit">Send Link</ForgotSubmit>
        </ForgotForm>
      )}
    </Container>
  )
}

export default ForgotPassword

const Container = styled.div`
  margin-top: 70px;
  font-size: 50px;
  min-height: 200px;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ForgotForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const ForgotInput = styled.input`
  margin-top: 30px;
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const ForgotSubmit = styled.button`
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
`
