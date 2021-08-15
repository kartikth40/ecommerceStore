import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const RegisterComplete = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validation
    if (!email || !password) {
      toast.error('Email and Password fields cannot be empty.')
      return
    }
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.')
      return
    }
    try {
      const result = await auth.signInWithEmailLink(email, window.location.href)

      if (result.user.emailVerified) {
        // remove user email from local storage
        window.localStorage.removeItem('emailForRegistration')
        // get user id token
        let user = auth.currentUser
        await user.updatePassword(password)
        const idTokenResult = await user.getIdTokenResult()
        // redux store

        // redirect
        history.push('/')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  return (
    <Container>
      <h4>Register Complete</h4>

      <RegisterForm onSubmit={handleSubmit}>
        <RegisterInput type="email" value={email} disabled />
        <RegisterInputPass
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          placeholder="Password"
        />
        <br />
        <RegisterSubmit type="submit">Complete Register</RegisterSubmit>
      </RegisterForm>
    </Container>
  )
}

export default RegisterComplete
const Container = styled.div`
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
`
const RegisterInputPass = styled(RegisterInput)`
  border-bottom: 3px black solid;
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
