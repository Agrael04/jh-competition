import React from 'react'
import { useSelector, useActions } from 'store'

import UserAutocomplete from 'containers/user-autocomplete'

import ContactAbornment from './contact-abornment'

import useGetTrainingQuery from '../../../queries/get-training'

export default function ContactSuggester() {
  const actions = useActions()
  const contact = useSelector(s => s.schedule.trainingDialog.recordForm?.contact)
  const { _id, recordId } = useSelector(state => ({
    _id: state.schedule.trainingDialog._id,
    recordId: state.schedule.trainingDialog.recordForm?._id,
  }))
  const trainingQuery = useGetTrainingQuery(_id)

  const record = React.useMemo(
    () => {
      return trainingQuery.data?.trainingRecords.find(tr => tr._id === recordId)
    }, [trainingQuery, recordId]
  )

  const handleChange = (link: string | null) => {
    actions.schedule.trainingDialog.updateRecord({ contact: link ? { link } : undefined })
  }

  const initialFilter = record?.contact?.fullName
  const initialBalance = record?.contact?.balance || 0

  return (
    <UserAutocomplete
      value={contact ? contact.link : null}
      handleChange={handleChange}
      label='Контактное лицо'
      initialFilter={initialFilter}
      initialBalance={initialBalance}
      StartAdornment={ContactAbornment}
    />
  )
}
