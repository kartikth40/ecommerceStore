import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyCPFGJjp-_O2f7Z2q7UwObaP1uTuBSiWD0',
  authDomain: 'ani-cart.firebaseapp.com',
  projectId: 'ani-cart',
  storageBucket: 'ani-cart.appspot.com',
  messagingSenderId: '452784838038',
  appId: '1:452784838038:web:a33d8a171e3d41348539b7',
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

// export
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
