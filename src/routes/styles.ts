import { makeStyles, Theme } from '@material-ui/core/styles'
import background from '../assets/background.jpg'

export default makeStyles((theme: Theme) => ({
  app: {
    background: `url(${background})`,
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
  },
}))
