import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import styled, { css } from 'styled-components'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { createOrUpdateUser } from '../../functions/auth'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()
  const dispatch = useDispatch()

  const roleBasedRedirect = (res) => {
    if (res.data.role === 'admin') {
      history.push('/admin/dashboard')
    } else {
      history.push('/user/history')
    }
  }
  const { user } = useSelector((state) => ({ ...state })) // get user state

  useEffect(() => {
    if (user && user.token) {
      history.push('/')
    }
  }, [user, history])

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

      createOrUpdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: 'LOGGED_IN_USER',
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              id: res.data._id,
            },
          })
          roleBasedRedirect(res)
        })
        .catch((err) => console.log(err.message))

      // history.push('/')
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

        createOrUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: 'LOGGED_IN_USER',
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                id: res.data._id,
              },
            })
            roleBasedRedirect(res)
          })
          .catch((err) => console.log(err.message))
        //REDIRECT
        // history.push('/')
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
          <ForgotPassword to="/forgot/password">Forget Password</ForgotPassword>
        </LoginForm>
      )}
    </Container>
  )
}

export default Login

const Container = styled.div`
  font-size: 50px;
  min-height: 400px;
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const LoginForm = styled.form`
  width: 400px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`
const LoginInput = styled.input`
  width: 90%;
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  margin: 10px auto;
  border: none;
  outline: none;
  border: 3px solid black;
`
const ForgotPassword = styled(Link)`
  width: 90%;
  font-size: 20px;
  margin: 10px auto;
  text-align: center;
  color: red;
`
const LoginSubmit = styled.button`
  background-color: black;
  color: white;
  width: 90%;
  display: block;
  font-size: 25px;
  padding: 10px 20px;
  margin: 10px auto;
  border: none;
  transition: 250ms all;
  cursor: pointer;
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
      cursor: auto;
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
