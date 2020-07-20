import React from 'react'

import { useActions } from 'store'

import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import IRecord from './record'

import { getTimeLabel } from 'data/times'

interface IProps {
  record: IRecord
  index: number
}

export default function PaymentItem({ record, index }: IProps) {
  const actions = useActions()
  const openUpdateRecordForm = actions.checkDialog.openUpdateRecordForm

  const openEditForm = React.useCallback(
    () => {
      openUpdateRecordForm({
        _id: record._id,
        priceType: record.priceType || 'units',
        priceAmount: record.priceAmount,
      })
    },
    [record, openUpdateRecordForm]
  )

  return (
    <ListItem button={true} key={record._id} onClick={openEditForm}>
      <ListItemAvatar>
        <Avatar>
          {index + 1}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={`${record.training.type}${record.training.name ? ` (${record.training.name})` : ''}, ${getTimeLabel(record?.resource.startTime)} - ${getTimeLabel(record?.resource.endTime)}`}
        secondary={record.priceAmount ? `${record.priceAmount} ${record.priceType === 'units' ? 'АБ' : 'грн'}` : null}
      />
    </ListItem>
  )
}
