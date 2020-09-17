import React from 'react'

import ClientSuggester from 'containers/client-suggester'

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
    <ClientSuggester
      value={contact ? contact.link : null}
      handleChange={handleChange}
      label={label}
      disabled={disabled}
      initialFilter={initialFilter}
    />
  )
}
