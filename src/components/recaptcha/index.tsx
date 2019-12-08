import React from 'react'

import { firebase } from '../../api'

export default function Recaptcha({ setter, callback }: any) {
  React.useEffect(() => {
    setter(
      new firebase.auth.RecaptchaVerifier(
        'recaptcha',
        {
          size: 'invisible',
          callback() {
            callback()
          },
        }
      )
    )
  }, [])

  return (
    <div id='recaptcha' />
  )
}
