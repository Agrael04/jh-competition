import React from 'react'
import { useSelector } from 'store'

import List from '@material-ui/core/List'

import useGetContactDetailsQuery from '../graphql/get-contract-details'

import RecordForm from './record-form'
import RecordItem from './record-item'

export default function TrainingDialog() {
  const isFormActive = useSelector(state => !!state.checkDialog.recordForm)

  const { data } = useGetContactDetailsQuery()

  if (isFormActive) {
    return (
      <RecordForm />
    )
  }

  return (
    <div>
      <List>
        {
          data?.trainingRecords.map((record, index) => (
            <RecordItem record={record} index={index} key={record._id} />
          ))
        }
      </List>
    </div>
  )
}
