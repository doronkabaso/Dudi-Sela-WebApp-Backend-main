import { getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from '../.key.service.js'

export const authListener = () => {
    const auth = getAuth(initializeApp(getFirebaseConfig()))
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid
        console.log("User is signed in", uid)
      } else {
        console.log("User is signed out")
      }
    })
}
