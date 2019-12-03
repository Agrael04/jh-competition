import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// // Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE))

const auth = app.auth()

if (auth !== null) {
  console.log(auth.currentUser)
}
// firebase.auth().createUserWithEmailAndPassword

// firebase.auth().signInWithEmailAndPassword

// firebase.auth().sendPasswordResetEmail

// firebase.auth().email
