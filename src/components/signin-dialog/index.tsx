import React from 'react'

import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link'
import CardContent from '@material-ui/core/CardContent'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import PhoneIcon from '@material-ui/icons/Phone'
import MailIcon from '@material-ui/icons/Mail'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import useStyles from '../../hooks/use-styles'
import useFirebaseAuth from '../../hooks/use-firebase-auth'
import css from './styles'

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
    signInWithCredentials,
    setRecaptchaVerifier,
    sentMobileCode,
    confirmSignInWithMobilePhone,
    resetConfirmation,
    resetPassword,
  } = useFirebaseAuth(recaptcha)
  const [emailVerified, setEmailVerified] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [values, setValues] = React.useState({
    phone: '',
    mobileCode: '',
    email: '',
    password: '',
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

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword)
  }

  const verifyEmail = (e: any) => {
    e.preventDefault()
    setEmailVerified(true)
  }

  const credentialSignin = (e: any) => {
    e.preventDefault()
    signInWithCredentials(values.email, values.password)
  }

  const phoneSignin = (e: any) => {
    e.preventDefault()
    signInWithPhoneNumber(`+38${values.phone}`)
  }

  const confirmMobileCode = (e: any) => {
    e.preventDefault()
    confirmSignInWithMobilePhone(values.mobileCode)
  }

  const resetEmail = () => {
    setEmailVerified(false)
  }

  const recoverPassword = () => {
    setEmailVerified(false)
    resetPassword(values.email)
  }

  return (
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
            {
              !emailVerified && (
                <form onSubmit={verifyEmail}>
                  <TextField
                    variant='filled'
                    label='Электронная почта'
                    fullWidth={true}
                    margin='normal'
                    name='email'
                    onChange={handleChange}
                    value={values.email}
                  />
                  <Grid justify='flex-end' item={true} direction='row' container={true}>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                    >
                      Продолжить
                    </Button>
                  </Grid>
                </form>
              )
            }

            {
              emailVerified && (
                <form onSubmit={credentialSignin}>
                  <Typography variant='body2'>
                    Введите пароль для адреса:
                    {' '}
                    <Link onClick={resetEmail}>
                      {values.email}
                    </Link>
                  </Typography>
                  <TextField
                    variant='filled'
                    label='Пароль'
                    fullWidth={true}
                    margin='normal'
                    name='password'
                    onChange={handleChange}
                    value={values.password}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            onClick={handleShowPasswordClick}
                            onMouseDown={handleShowPasswordClick}
                          >
                            {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Grid justify='space-between' container={true} direction='row'>
                    <Button
                      onClick={recoverPassword}
                    >
                      Восстановить пароль
                    </Button>
                    <Button
                      variant='contained'
                      color='primary'
                      type='submit'
                    >
                      Войти
                    </Button>
                  </Grid>
                </form>
              )
            }
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
                <form onSubmit={phoneSignin}>
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
                      type='submit'
                    >
                      Отправить код
                    </Button>
                  </Grid>
                </form>
              )
            }

            {
              sentMobileCode && (
                <form onSubmit={confirmMobileCode}>
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
                      type='submit'
                    >
                      Продолжить
                    </Button>
                  </Grid>
                </form>
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
  )
}
