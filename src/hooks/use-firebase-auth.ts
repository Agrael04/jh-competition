import React from 'react'

import { auth } from '../api'

export default function useFirebaseAuth(ref: any) {
  const [signedIn, setSignedIn] = React.useState(false)
  const [recaptchaVerifier, setRecaptchaVerifier] = React.useState()
  const [confirmation, setConfirmation] = React.useState()

  React.useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(
      user => setSignedIn(!!user)
    )
    return () => unregisterAuthObserver()
  }, [])

  const signOut = () => auth.signOut()

  const signInWithCredentials = (email: string, password: string) => {
    auth.signInWithEmailAndPassword(email, password)
  }

  const signInWithPhoneNumber = (phoneNumber: string) => {
    const appVerifier = recaptchaVerifier
    auth
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(confirmationResult => {
        setConfirmation(confirmationResult)
      })
      .catch(error => {
        console.log(error)
      })
  }

  const confirmSignInWithMobilePhone = (code: string) => {
    confirmation.confirm(code)
  }

  const resetConfirmation = () => setConfirmation(null)

  const resetPassword = (email: string) => {
    const redirect = process.env.PUBLIC_URL
      ? { url: process.env.PUBLIC_URL }
      : null
    auth.sendPasswordResetEmail(email, redirect)
  }

  return {
    signedIn,
    signInWithPhoneNumber,
    signInWithCredentials,
    signOut,
    setRecaptchaVerifier,
    resetPassword,

    sentMobileCode: !!confirmation,
    resetConfirmation,
    confirmSignInWithMobilePhone,
  }
}
