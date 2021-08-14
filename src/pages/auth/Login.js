import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import styled, { css } from 'styled-components'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (!email || password.length < 6) {
      toast.error('Email and Password should be valid.')
      setLoading(false)
      return
    }

    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      const { user } = result
      const idTokenResult = await user.getIdTokenResult()

      // login user
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      })
      history.push('/')
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        toast.error('Your Email or Password are incorrect.')
      } else {
        toast.error(error.message)
      }
      console.log(error)
      setLoading(false)
    }
  }

  const googleLogin = () => {
    setLoading(true)
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result
        const idTokenResult = await user.getIdTokenResult()

        dispatch({
          type: 'LOGGED_IN_USER',
          payload: {
            email: user.email,
            token: idTokenResult.token,
          },
        })
        history.push('/')
      })
      .catch((error) => {
        setLoading(false)
        console.log(error)
        toast.error(error.message)
      })
  }
  return (
    <Container>
      {loading ? (
        <h4>Loading...</h4>
      ) : (
        <LoginForm onSubmit={handleSubmit}>
          <LoginInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            placeholder="Your Email"
          />
          <LoginInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
          />
          <br />
          <LoginSubmit disable={!email || password.length < 6} type="submit">
            Login with Email
          </LoginSubmit>
          <LoginWithGoogle onClick={googleLogin} type="button">
            Login with Google
          </LoginWithGoogle>
        </LoginForm>
      )}
    </Container>
  )
}

export default Login

const Container = styled.div`
  font-size: 50px;
  min-height: 200px;
  height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const LoginForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const LoginInput = styled.input`
  width: 300px;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  margin: 10px;
  border: none;
  outline: none;
  border: 3px solid black;
`
const LoginSubmit = styled.button`
  background-color: black;
  color: white;
  width: 100%;
  display: block;
  font-size: 30px;
  padding: 10px 20px;
  margin: 10px;
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
const LoginWithGoogle = styled(LoginSubmit)`
  background-color: red;
`
