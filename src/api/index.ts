import * as firebase from 'firebase/app'

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import 'firebase/analytics'

// // Add the Firebase products that you want to use
import 'firebase/auth'
import 'firebase/firestore'

const app = firebase.initializeApp(JSON.parse(process.env.REACT_APP_FIREBASE))

const auth = app.auth()

firebase.auth().useDeviceLanguage()

const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
  'size': 'invisible',
  'callback': () => {
    console.log()
  },
})

let code = { confirm: console.log }

auth.signInWithPhoneNumber('+380502745793', recaptchaVerifier)
  .then(confirmationResult => {
    code = confirmationResult
  })
  .then(() => {
    return code.confirm('sad')
  })
  .catch(console.log)

if (auth !== null) {
  console.log(auth.currentUser)
}
// firebase.auth().createUserWithEmailAndPassword

// firebase.auth().signInWithEmailAndPassword

// firebase.auth().sendPasswordResetEmail

// firebase.auth().email
