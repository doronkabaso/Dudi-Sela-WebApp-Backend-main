
import { initializeApp } from 'firebase/app'
import getFirebaseConfig from '../../.key.service.js'
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence, createUserWithEmailAndPassword } from "firebase/auth"

const auth = getAuth(initializeApp(getFirebaseConfig()))

export function signinUser(email, password, fn) {
    setPersistence(auth, browserSessionPersistence)
        .then(async () => {
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredential.user
                fn(user)
            } catch (error) {
                const errorCode = error.code
                const errorMessage = error.message
                console.error(error)
                fn(error)
            }
        })
}

export function createUser(email, password, fn) {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const uid = userCredential.user.uid
            fn(uid)
        })
        .catch((error) => {
            const errorCode = error.code
            const errorMessage = error.message
            fn(error)
        })
}
