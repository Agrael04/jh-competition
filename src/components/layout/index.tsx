import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import { Link } from 'react-router-dom'

import useStyles from '../../hooks/use-styles'
import useFirebaseAuth from '../../hooks/use-firebase-auth'
import css from './styles'

import SigninDialog from '../signin-dialog'

interface IProps {
  children: React.ReactNode
}

export default function Layout({ children }: IProps) {
  const recaptcha = React.useRef(null)
  const { signedIn, signOut } = useFirebaseAuth(recaptcha)
  const [openedSigninDialog, setOpenedSigninDialog] = React.useState(false)
  const classes = useStyles(css)

  const openSigninDialog = () => setOpenedSigninDialog(true)
  const closeSigninDialog = () => setOpenedSigninDialog(false)

  return (
    <div className={classes.app}>
      <AppBar position='fixed' className={classes.appBar}>
        <Container>
          <Toolbar>
            <Typography variant='h6' className={classes.title}>
              Jumping Hall Competitions
            </Typography>
            <Button color='inherit' className={classes.button}>
              <Link to='/create-training'>
                Добавить тренировку
              </Link>
            </Button>
            {
              !signedIn && (
                <Button color='inherit' className={classes.button} onClick={openSigninDialog}>
                  Войти
                </Button>
              )
            }
            {
              signedIn && (
                <Button color='inherit' className={classes.button} onClick={signOut}>
                  Выйти
                </Button>
              )
            }

          </Toolbar>
        </Container>
      </AppBar>
      {
        !signedIn && (
          <SigninDialog
            open={openedSigninDialog}
            onClose={closeSigninDialog}
          />
        )
      }
      <Box paddingTop={8}>
        {children}
      </Box>
    </div>
  )
}
