import React, { useState } from 'react'
import styled from 'styled-components'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const Register = () => {
  const [email, setEmail] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
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
      <Row>
        <h4>Register</h4>

        <RegisterForm onSubmit={handleSubmit}>
          <RegisterInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
          />

          <RegisterSubmit type="submit">Register</RegisterSubmit>
        </RegisterForm>
      </Row>
    </Container>
  )
}

export default Register

const Container = styled.div`
  padding: 10px;
`
const Row = styled.div``
const RegisterForm = styled.form``
const RegisterInput = styled.input``
const RegisterSubmit = styled.button``
