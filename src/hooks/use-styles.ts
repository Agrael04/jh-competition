import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles'

export default (css: any) => {
  const theme = useTheme()

  return makeStyles((theme: Theme) => {
    return createStyles(css(theme))
  })({ theme })
}
