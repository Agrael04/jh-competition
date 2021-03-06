import { useSelector, useDispatch } from 'store'
import actions from 'store/ui/dialogs/check-dialog/actions'

import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import ClientSuggester from 'containers/client-suggester'

import getClientLabel from 'utils/get-client-label'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

interface IProps {
  label: string
  disabled?: boolean
}

const Abornment = ({ balance }: { balance: number }) => {
  return (
    <InputAdornment position='start'>
      <Typography color={balance > 0 ? 'primary' : balance < 0 ? 'error' : 'textSecondary'}>
        {balance > 0 ? `+${balance}` : balance}
        {' грн'}
      </Typography>
    </InputAdornment>
  )
}

export default function ContactSuggester({ label, disabled }: IProps) {
  const dispatch = useDispatch()
  const contact = useSelector(state => state.ui.dialogs.checkDialog.params.contact)

  const { data } = useGetContactDetailsQuery()

  const handleChange = (link: string | null) => {
    dispatch(actions.updateContact(link ? { link } : null))
  }

  const initialFilter = getClientLabel(data?.client)
  const initialBalance = data?.client.balance || 0

  if (contact && !data?.client) {
    return (
      <Grid container={true}>
        <Box margin='auto'>
          <CircularProgress />
        </Box>
      </Grid>
    )
  }

  return (
    <ClientSuggester
      value={contact ? contact.link : null}
      handleChange={handleChange}
      label={label}
      disabled={disabled}
      initialFilter={initialFilter}
      initialBalance={initialBalance}
      StartAdornment={Abornment}
    />
  )
}
