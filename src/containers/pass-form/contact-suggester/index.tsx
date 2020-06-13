import React from 'react'

import UserAutocomplete from 'containers/user-autocomplete'

import { useContext } from '../context'

interface IProps {
  [x: string]: any
  label: string
  initialFilter?: string
}

export default function ContactSuggester({ label, initialFilter, disabled }: IProps) {
  const contact = useContext(s => s.state.passForm?.contact)
  const updateForm = useContext(s => s.updateForm)

  const handleChange = (link: string | null) => {
    updateForm({ contact: link ? { link } : undefined })
  }

  return (
    <UserAutocomplete
      value={contact ? contact.link : null}
      handleChange={handleChange}
      label={label}
      disabled={disabled}
      initialFilter={initialFilter}
    />
  )
}
