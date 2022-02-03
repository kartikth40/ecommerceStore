import firebase from 'firebase/app'

export const getRefreshedIdToken = async () => {
  let refreshedToken = await firebase
    .auth()
    .currentUser?.getIdToken()
    .then(function (idToken) {
      return idToken
    })
    .catch(function (error) {
      console.log('ERRO IN GETTING FIREBASE REFRESHED AUTH TOKEN -->', error)
      return ''
    })

  return refreshedToken
}
