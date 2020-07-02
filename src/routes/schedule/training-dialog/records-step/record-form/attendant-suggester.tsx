import React from 'react'
import { useSelector, useActions } from 'store'

import UserAutocomplete from 'containers/user-autocomplete'

import useGetTrainingQuery from '../../../queries/get-training'

export default function ContactSuggester() {
  const actions = useActions()
  const attendant = useSelector(s => s.schedule.trainingDialog.recordForm?.attendant)
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
    actions.schedule.trainingDialog.updateRecord({ attendant: link ? { link } : undefined })
  }

  const initialFilter = record?.attendant?.fullName

  return (
    <UserAutocomplete
      value={attendant ? attendant.link : null}
      handleChange={handleChange}
      label='Физическое лицо'
      initialFilter={initialFilter}
    />
  )
}
