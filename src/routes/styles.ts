import { Theme } from '@material-ui/core/styles'
import background from '../assets/background.jpg'

export default (theme: Theme) => ({
  app: {
    background: `url(${background})`,
    textAlign: 'center',
    minHeight: '100vh',
  },
  appWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#f26000',
    fontSize: '36px',
    fontWeight: 'bold',
    margin: 'auto',
  },
  appBar: {
    color: 'black',
    background: 'white',
  },
  title: {
    flexGrow: '1',
    textAlign: 'left',
  },
  button: {
    fontWeight: 'bold',
  },
})
