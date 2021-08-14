import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setEmail(window.localStorage.getItem('emailForRegistration'))
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    // validation
    if (!email || !password) {
      toast.error('Enter the New Password is required')
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
      <Row>
        <h4>Register Complete</h4>

        <RegisterForm onSubmit={handleSubmit}>
          <RegisterInput type="email" value={email} disabled />
          <RegisterInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            placeholder="Password"
          />
          <br />
          <RegisterSubmit type="submit">Complete Register</RegisterSubmit>
        </RegisterForm>
      </Row>
    </Container>
  )
}

export default RegisterComplete

const Container = styled.div`
  padding: 10px;
`
const Row = styled.div``
const RegisterForm = styled.form``
const RegisterInput = styled.input``
const RegisterSubmit = styled.button``
