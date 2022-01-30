import firebase from 'firebase/app'

export const getRefreshedIdToken = async () => {
  let refreshedToken = await firebase
    .auth()
    .currentUser?.getIdToken()
    .then(function (idToken) {
      return idToken
    })
    .catch(function (error) {
      console.log('Error getting refreshed firebase verified token', error)
      return ''
    })

  return refreshedToken
}
