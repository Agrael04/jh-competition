import React from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import RecordForm from './record-form'

export default function TrainingDialog() {
  const { data } = useGetContactDetailsQuery()

  const [openedRecordForm, setOpenedRecordForm] = React.useState(false)

  const openRecordForm = () => {
    setOpenedRecordForm(true)
  }

  const closeRecordForm = () => {
    setOpenedRecordForm(false)
  }

  if (openedRecordForm) {
    return (
      <RecordForm cancel={closeRecordForm} />
    )
  }

  return (
    <div>
      <List>
        {
          data?.trainingRecords.map((record, index) => (
            <ListItem button={true} key={record._id} onClick={openRecordForm}>
              <ListItemAvatar>
                <Avatar>
                  {index + 1}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={`${record.training.type} (${record.training.name}), 8:00 - 9:00`}
                secondary={index % 2 === 0 ? `600 грн` : '3АБ'}
              />
            </ListItem>
          ))
        }
      </List>
    </div>
  )
}
