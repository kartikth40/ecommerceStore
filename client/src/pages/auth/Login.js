import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'
import device from '../../mediaQueries'
import styled, { css } from 'styled-components'
import { auth, googleAuthProvider } from '../../firebase'
import { toast } from 'react-toastify'
import { createOrUpdateUser } from '../../functions/auth'
import { FaGoogle, FaEnvelope } from 'react-icons/fa'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state })) // get user state
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    let intended = history.location.state
    if (intended) {
      return
    } else if (user && user.token) {
      history.push('/')
    }
  }, [user, history])

  const roleBasedRedirect = (res) => {
    // check if intended - if user wants to go to the same page after a login
    let intended = history.location.state
    if (intended) {
      history.push({
        pathname: `${intended.from}`,
        state: { from: `${intended.from}` },
      })
    } else {
      if (res.data.role === 'admin') {
        history.push('/admin/dashboard')
      } else {
        history.push('/user/history')
      }
    }
  }

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
          setLoading(false)
          roleBasedRedirect(res)
        })
        .catch((err) =>
          console.log(
            'ERROR CREATING NEW USER ACCOUNT WITH THE GIVEN EMAIL AND PASSOWORD --> ',
            err.message
          )
        )

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
          .catch((err) =>
            console.log(
              'ERROR CREATING NEW USER ACCOUNT WITH THE GIVEN GMAIL ACCOUNT --> ',
              err.message
            )
          )
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
            <EmailIcon />
            <span>Login</span>
          </LoginSubmit>
          <LoginWithGoogle onClick={googleLogin} type="button">
            <GoogleIcon />
            <span>Login</span>
          </LoginWithGoogle>
          <ForgotPassword to="/forgot/password">Forget Password</ForgotPassword>
        </LoginForm>
      )}
    </Container>
  )
}

export default Login

const Container = styled.div`
  margin-top: 70px;
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

  @media screen and ${device.mobile} {
    width: 300px;
  }
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

  @media screen and ${device.mobile} {
    font-size: 15px;
    border: 2px solid black;
  }
`
const ForgotPassword = styled(Link)`
  width: 90%;
  font-size: 20px;
  margin: 10px auto;
  text-align: center;
  color: red;
  @media screen and ${device.mobile} {
    font-size: 15px;
  }
`
const LoginSubmit = styled.button`
  background-color: black;
  color: white;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  font-weight: light;
  padding: 10px 20px;
  margin: 10px auto;
  border: 2px solid black;

  transition: 250ms all;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1rem;
  box-sizing: border-box;

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
      background-color: white;
      color: rgba(0, 0, 0, 0.4);
      border: 2px solid rgba(0, 0, 0, 0.4);
      cursor: auto;
      &:hover,
      &:focus {
        background-color: white;
        color: rgba(0, 0, 0, 0.4);
        border: 2px solid rgba(0, 0, 0, 0.4);
        border-radius: 0;
      }
    `}
  & span {
    padding-top: 5px;
  }
  @media screen and ${device.mobile} {
    font-size: 20px;
  }
`
const LoginWithGoogle = styled(LoginSubmit)`
  background-color: red;
  border: none;
`
const EmailIcon = styled(FaEnvelope)`
  margin-right: 40px;
`
const GoogleIcon = styled(FaGoogle)`
  margin-right: 40px;
`
