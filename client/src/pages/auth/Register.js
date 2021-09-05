import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('')
  const history = useHistory()

  const { user } = useSelector((state) => ({ ...state }))

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user, history])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) {
      toast.error('Email Field should not be empty.')
    }
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    }

    await auth.sendSignInLinkToEmail(email, config)
    // Toast notification
    toast.success(
      `Email is sent to ${email}.\n Click the link in your inbox to complete your registration.`
    )
    // save user Email
    window.localStorage.setItem('emailForRegistration', email)
    // clear state
    setEmail('')
  }

  return (
    <Container>
      <RegisterForm onSubmit={handleSubmit}>
        <RegisterInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Your Email"
        />
        <br />
        <RegisterSubmit type="submit">Register</RegisterSubmit>
      </RegisterForm>
    </Container>
  )
}

export default Register

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
const RegisterForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const RegisterInput = styled.input`
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  border: none;
  outline: none;
  border-bottom: 3px solid black;
`
const RegisterSubmit = styled.button`
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
