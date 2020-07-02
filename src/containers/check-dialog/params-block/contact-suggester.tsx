import React from 'react'

import InputAdornment from '@material-ui/core/InputAdornment'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import UserAutocomplete from 'containers/user-autocomplete'

import useGetContactDetailsQuery from '../graphql/get-contact-details'
import { useContext } from '../context'

interface IProps {
  [x: string]: any
  label: string
  initialFilter?: string
}

const Abornment = ({ balance }: { balance: number }) => {
  return (
    <InputAdornment position='start'>
      <Typography color={balance > 0 ? 'primary' : balance < 0 ? 'error' : 'textSecondary'}>
        {balance > 0 ? `+${balance}` : balance} грн
      </Typography>
    </InputAdornment>
  )
}

export default function ContactSuggester({ label, disabled }: IProps) {
  const { data } = useGetContactDetailsQuery()
  const contact = useContext(s => s.state.params.contact)

  const updateContact = useContext(s => s.actions.updateContact)

  const handleChange = (link: string | null) => {
    updateContact(link ? { link } : null)
  }

  const initialFilter = data?.user.fullName
  const initialBalance = data?.user.balance || 0

  if (contact && !data?.user) {
    return (
      <Grid container={true}>
        <Box margin='auto'>
          <CircularProgress />
        </Box>
      </Grid>
    )
  }

  return (
    <UserAutocomplete
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
