import React from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'

import useStyles from '../../hooks/use-styles'
import useFirebaseAuth from '../../hooks/use-firebase-auth'
import css, { theme } from './styles'

import Recaptcha from '../recaptcha'

interface IProps {
  open: boolean
  onClose: () => void
}

export default function SinginDialog({ open, onClose }: IProps) {
  const classes = useStyles(css)
  const recaptcha = React.useRef(null)
  const {
    signedIn,
    signInWithPhoneNumber,
    setRecaptchaVerifier,
    sentMobileCode,
    confirmSignInWithMobilePhone,
    resetConfirmation,
  } = useFirebaseAuth(recaptcha)
  const [values, setValues] = React.useState({
    phone: '',
    mobileCode: '',
  })

  if (signedIn) {
    return null
  }

  const handleChange = (e: any) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const phoneSignin = () => {
    signInWithPhoneNumber(`+38${values.phone}`)
  }

  const confirmMobileCode = () => {
    confirmSignInWithMobilePhone(values.mobileCode)
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth={true}
        maxWidth='md'
      >
        <Typography variant='h5' align='center' className={classes.title}>
          Вход в систему
        </Typography>
        <Grid container={true} justify='space-between'>
          <Grid item={true} component={Card} sm={true} className={classes.card}>
            <div className={classes.media}>
              <MailIcon fontSize='large' className={classes.icon} />
            </div>
            <CardContent>
              <Typography variant='body1'>
                Вход с помощью електронной почты
              </Typography>
            </CardContent>
          </Grid>
          <Grid item={true} component={Card} sm={true} className={classes.card}>
            <div className={classes.media}>
              <PhoneIcon fontSize='large' className={classes.icon} />
            </div>
            <CardContent>
              <Typography variant='body1'>
                Вход с помощью мобильного телефона
              </Typography>

              {
                !sentMobileCode && (
                  <>
                    <TextField
                      variant='filled'
                      label='Мобильный телефон'
                      fullWidth={true}
                      margin='normal'
                      name='phone'
                      onChange={handleChange}
                      value={values.phone}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>+38</InputAdornment>,
                      }}
                    />
                    <Grid justify='flex-end' item={true} direction='row' container={true}>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={phoneSignin}
                      >
                        Отправить код
                      </Button>
                    </Grid>
                  </>
                )
              }

              {
                sentMobileCode && (
                  <>
                    <Typography variant='body2'>
                      Введите код отправленный на телефон
                      {' '}
                      <Link onClick={resetConfirmation}>
                        {values.phone && `+38${values.phone}`}
                      </Link>
                    </Typography>
                    <TextField
                      variant='filled'
                      label='Код из 6 цифр'
                      fullWidth={true}
                      margin='normal'
                      name='mobileCode'
                      onChange={handleChange}
                      value={values.mobileCode}
                    />
                    <Grid justify='space-between' container={true} direction='row'>
                      <Button
                        variant='contained'
                        onClick={resetConfirmation}
                      >
                        Отправить снова
                      </Button>
                      <Button
                        variant='contained'
                        color='primary'
                        onClick={confirmMobileCode}
                      >
                        Продолжить
                      </Button>
                    </Grid>
                  </>
                )
              }
            </CardContent>
          </Grid>
        </Grid>
        <Recaptcha
          setter={setRecaptchaVerifier}
          callback={signInWithPhoneNumber}
        />
      </Dialog>
    </ThemeProvider>
  )
}
