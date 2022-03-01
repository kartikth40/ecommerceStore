import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'
import { currentAdmin } from '../../functions/auth'
import { getRefreshedIdToken } from '../../functions/getRefreshedIdToken'

const AdminRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }))
  const [ok, setOk] = useState(false)

  useEffect(() => {
    const load = async () => {
      let token = await getRefreshedIdToken()
      if (user && user.token) {
        currentAdmin(token)
          .then((res) => {
            setOk(true)
          })
          .catch((err) => {
            console.log('ADMIN ROUTE ERROR: ', err)
            setOk(false)
          })
      }
    }
    load()
  }, [user])

  return !ok ? (
    <Route {...rest} render={() => children} />
  ) : (
    <LoadingToRedirect />
  )
}

export default AdminRoute
