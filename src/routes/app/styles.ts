import { Theme } from '@material-ui/core/styles'

export default (theme: Theme) => ({
  container: {
    display: 'flex',
    minHeight: '100vh',
  },
  rootPaper: {
    marginTop: '24px',
    minHeight: '90vh',
    width: '100%',
  },
  card: {
    minWidth: `calc(33% - ${theme.spacing(6)}px)`,
    maxWidth: `calc(33% - ${theme.spacing(6)}px)`,
    margin: theme.spacing(1, 3),
  },
  media: {
    height: theme.spacing(8),
    display: 'flex',
  },
  icon: {
    color: 'white',
    margin: 'auto',
  },
  menuButton: {
    marginLeft: 'auto',
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',

    '&:hover': {
      textDecoration: 'none',
    },
  },
})
