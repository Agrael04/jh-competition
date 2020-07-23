import React from 'react'
import { useActions } from 'store'

import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'
import Avatar from '@material-ui/core/Avatar'

import useGetContactDetailsQuery from '../graphql/get-contact-details'

import { getTimeLabel } from 'data/times'

const trainingTypes = {
  'GROUP': 'Групповая тренировка',
  'RENT': 'Аренда батута',
  'RENT_WITH_TRAINER': 'Аренда батута с тренером',
  'EVENT': 'Тематическое мероприятие',
} as any

export default function TrainingDialog() {
  const actions = useActions()
  const openCreatePositionForm = actions.checkDialog.openCreatePositionForm
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
            startTime: item.resource.startTime,
            endTime: item.resource.endTime,
            count: 1,
            serviceId: item.training.type === 'GROUP' ? 2 : 3,
          },
        ]
      }

      const record = res[index]

      return [
        ...res.filter((item, i) => i !== index),
        {
          ...record,
          startTime: Math.min(record.startTime, item.resource.startTime),
          endTime: Math.max(record.endTime, item.resource.endTime),
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
            startTime: item.resource.startTime,
            endTime: item.resource.endTime,
            count: 1,
            serviceId: item.training.type === 'RENT' ? 0 : 1,
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

  return (
    <>
      <Grid item={true} lg={12} container={true} spacing={1}>
        {
          mappedRentRecords
            .map(r => (
              <Grid item={true} key={r._id}>
                <Chip
                  key={r._id}
                  label={`${trainingTypes[r.type]}${r.name ? `(${r.name})` : ''} - ${getTimeLabel(r.startTime)} : ${getTimeLabel(r.endTime)}`}
                  color='primary'
                  avatar={<Avatar>{r.count}</Avatar>}
                  onClick={() => openCreatePositionForm({ type: 'training', service: r.serviceId })}
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
                  label={`${trainingTypes[r.type]}${r.name ? `(${r.name})` : ''} - ${getTimeLabel(r.startTime)} : ${getTimeLabel(r.endTime)}`}
                  color='primary'
                  avatar={<Avatar>{r.count}</Avatar>}
                  onClick={() => openCreatePositionForm({ type: 'training', service: r.serviceId })}
                />
              </Grid>
            ))
        }
      </Grid>
    </>
  )
}
