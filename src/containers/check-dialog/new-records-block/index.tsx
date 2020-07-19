import React from 'react'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

const trainingTypes = {
  'GROUP': 'Групповая тренировка',
  'RENT': 'Аренда батута',
  'RENT_WITH_TRAINER': 'Аренда батута с тренером',
  'EVENT': 'Тематическое мероприятие',
} as any

export default function TrainingDialog() {
  const { data } = useGetContactDetailsQuery()

  const groupRecords = data?.trainingRecords.filter(tr => tr.training.type === 'GROUP' || tr.training.type === 'EVENT') || []
  const rentRecords = data?.trainingRecords.filter(tr => tr.training.type !== 'GROUP' && tr.training.type !== 'EVENT') || []

  const mappedGroupRecords = groupRecords.reduce(
    (res, item) => {
      const index = res.findIndex((record: any) => record._id === item.training._id)

      if (index === -1) {
        return [
          ...res,
          {
            _id: item.training._id,
            type: item.training.type,
            name: item.training.name,
            count: 1,
          },
        ]
      }

      const record = res[index]

      return [
        ...res.filter((item, i) => i !== index),
        {
          ...record,
          count: record.count + 1,
        },
      ]
    }, [] as any[]
  )

  const mappedRentRecords = rentRecords.reduce(
    (res, item) => {
      const index = res.findIndex((record: any) => record._id === item.resource._id)

      if (index === -1) {
        return [
          ...res,
          {
            _id: item.resource._id,
            type: item.training.type,
            name: item.training.name,
            count: 1,
          },
        ]
      }

      const record = res[index]

      return [
        ...res.filter((item, i) => i !== index),
        {
          ...record,
          count: record.count + 1,
        },
      ]
    }, [] as any[]
  )

  console.log(mappedRentRecords)
  console.log(mappedGroupRecords)

  return (
    <>
      <Grid item={true} lg={12} container={true} spacing={1}>
        {
          mappedRentRecords
            .map(r => (
              <Grid item={true} key={r._id}>
                <Chip
                  key={r._id}
                  label={`${trainingTypes[r.type]}${r.name ? `(${r.name})` : ''}`}
                  color='primary'
                  avatar={<Avatar>{r.count}</Avatar>}
                />
              </Grid>
            ))
        }
        {
          mappedGroupRecords
            .map(r => (
              <Grid item={true} key={r._id}>
                <Chip
                  key={r._id}
                  label={`${trainingTypes[r.type]}${r.name ? `(${r.name})` : ''}`}
                  color='primary'
                  avatar={<Avatar>{r.count}</Avatar>}
                />
              </Grid>
            ))
        }
      </Grid>
    </>
  )
}
