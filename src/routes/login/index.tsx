import React, { useState, useCallback } from 'react'
import { Redirect } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import useStyles from './styles'

import * as authApi from 'api/auth'

const LoginPage = () => {
  const classes = useStyles()
  const [loggenIn, setLoggedIn] = useState(authApi.isLoggedIn())

  const [credentials, setCredentials] = useState({ email: '', password: '' })

  const handleChange = useCallback(
    (e: React.ChangeEvent<{ name: string, value: string }>) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value })
    },
    [credentials, setCredentials]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      authApi.loginWithPassword(credentials.email, credentials.password)
        .then(
          () => setLoggedIn(authApi.isLoggedIn())
        )
        .catch(console.error)
    },
    [setLoggedIn]
  )

  if (loggenIn) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <Paper className={classes.rootPaper}>
      <form onSubmit={handleSubmit}>
        <Typography variant='h5'>
          Войти в систему
        </Typography>

        <Box marginY={2}>
          <TextField
            label='Электронной почта'
            type='text'
            name='email'
            onChange={handleChange}
            value={credentials.email}
            variant='outlined'
          />
        </Box>

        <Box marginY={2}>
          <TextField
            label='Пароль'
            type='password'
            name='password'
            onChange={handleChange}
            value={credentials.password}
            variant='outlined'
          />
        </Box>

        <Button color='primary' variant='contained' disabled={!credentials.email || !credentials.password} type='submit'>
          Войти
        </Button>
      </form>
    </Paper>
  )
}

export default LoginPage
